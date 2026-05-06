export const BRANCHES = [
  {
    id: "br-brahmapur",
    name: "Brahmapur",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-bhawanipatna",
    name: "Bhawanipatna",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-jeypore",
    name: "Jeypore",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-rayagada",
    name: "Rayagada",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-bargarh",
    name: "Bargarh",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-balangir",
    name: "Balangir",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-paralakhemundi",
    name: "Paralakhemundi",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  },
  {
    id: "br-aska",
    name: "Aska",
    salesTeam: {
      team_lead: "TBD",
      manager_name: "TBD",
      gem_name: "TBD"
    }
  }
];

export const getBranchByName = (name) => {
  return BRANCHES.find(branch => branch.name === name) || null;
};
