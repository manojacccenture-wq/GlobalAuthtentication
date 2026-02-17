import React from 'react';
import { ListViewContainer, useListView } from '../Users';

const RolesListView = () => {
  const sampleData = [
    { id: 1, name: 'Admin', description: 'Administrator', users: 5 },
    { id: 2, name: 'Supervisor', description: 'Supervisor', users: 10 }
  ];

  const listView = useListView(sampleData);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'users', label: 'Users Count' }
  ];

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' }
  ];

  return (
    <ListViewContainer
      title="Roles"
      subtitle="Manage system roles"
      totalCount={2}
      columns={columns}
      data={listView.paginatedData()}
      filterTabs={filterTabs}
      activeFilter={listView.activeFilter}
      searchValue={listView.searchTerm}
      currentPage={listView.currentPage}
      totalPages={listView.totalPages}
      itemsPerPage={listView.itemsPerPage}
      onTabChange={(tabId) => {
        listView.setActiveFilter(tabId);
        listView.setCurrentPage(1);
      }}
      onSearchChange={(value) => {
        listView.setSearchTerm(value);
        listView.setCurrentPage(1);
      }}
      onPageChange={(page) => listView.setCurrentPage(page)}
      onViewClick={(item) => console.log('View:', item)}
      onEditClick={(item) => console.log('Edit:', item)}
      onDeleteClick={(item) => console.log('Delete:', item)}
      onAddClick={() => console.log('Add new role')}
      onFilterClick={() => console.log('Filter clicked')}
      showAddButton={true}
      showPagination={true}
      showActions={true}
    />
  );
};

export default RolesListView;
