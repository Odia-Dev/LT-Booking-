const StatusBadge = ({ status }) => {
  const styles = {
    Paid: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Failed: 'bg-red-100 text-red-700',
    default: 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${styles[status] || styles.default}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
