import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const vehicles = await Vehicle.find({});
    let flattenedInventory = [];

    vehicles.forEach(v => {
      if (v.inventory && v.inventory.length > 0) {
        v.inventory.forEach(item => {
          flattenedInventory.push({
            id: `${v._id}-${item._id}`,
            vehicleId: v._id,
            itemId: item._id,
            vehicle: v.name,
            variant: item.variant_name,
            color: item.exterior_color,
            interior: item.interior_color,
            stock: item.stock_count
          });
        });
      }
    });

    return NextResponse.json(flattenedInventory);
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { vehicleId, itemId, stock } = await request.json();

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });

    const inventoryItem = vehicle.inventory.id(itemId);
    if (!inventoryItem) return NextResponse.json({ error: 'Inventory item not found' }, { status: 404 });

    inventoryItem.stock_count = stock;
    await vehicle.save();

    return NextResponse.json({ message: 'Stock updated successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { vehicleId, variant, color, interior, count } = await request.json();

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });

    // Add new inventory configuration
    vehicle.inventory.push({
      variant_name: variant,
      exterior_color: color,
      interior_color: interior,
      stock_count: count
    });

    await vehicle.save();
    return NextResponse.json({ message: 'Inventory added successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
