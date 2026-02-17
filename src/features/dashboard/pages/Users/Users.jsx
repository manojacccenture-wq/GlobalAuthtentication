import React from 'react';
import SummaryHeader from './components/SummaryHeader';
import SummaryCards from './components/SummaryCards';
import UserListHeader from './components/UserListHeader';
import UserListFilters from './components/UserListFilters';
import UserListTable from './components/UserListTable';
import Pagination from './components/Pagination';
import total_user from "../../../../assets/Images/Page_Image/Dashboard/User/Total_User.png"

import { useListView } from './hooks/useListView';

import { userManagementConfig } from './config';

const Users = () => {
  const sampleUserData = [
    { id: 1, username: 'Johndoe', role: 'Supervisor', vendor: 'Cleantech solutions' },
    { id: 2, username: 'Johndoe', role: 'Supervisor', vendor: 'Cleantech solutions' },
    { id: 3, username: 'Johndoe', role: 'Supervisor', vendor: 'Cleantech solutions' },
    { id: 4, username: 'Johndoe', role: 'Supervisor', vendor: 'Cleantech solutions' },
    { id: 5, username: 'Johndoe', role: 'Supervisor', vendor: 'Cleantech solutions' },
    { id: 6, username: 'Johndoe', role: 'Supervisor', vendor: 'Cleantech solutions' }
  ];

  const listView = useListView(sampleUserData);

  const summaryCardsData = [
    {
      label: 'Total User',
      value: '50',
      valueColor: '#6100FF',
      iconBg: '#6100FF',
      icon: total_user
    },
    {
      label: 'Total Staffs',
      value: '34',
      valueColor: '#6100FF',
      iconBg: '#6100FF',
      icon: total_user
    },
    {
      label: 'Supervisors',
      value: '05',
      valueColor: '#2ECC71',
      iconBg: '#2ECC71',
      icon: total_user
    },
    {
      label: 'Cleaners',
      value: '30',
      valueColor: '#FFA800',
      iconBg: '#FFA800',
      icon: total_user
    }
  ];

  const handleTabChange = (tabId) => {
    listView.setActiveFilter(tabId);
    listView.setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    listView.setSearchTerm(value);
    listView.setCurrentPage(1);
  };

  const handleViewClick = (user) => {
    console.log('View user:', user);
  };

  const handleEditClick = (user) => {
    console.log('Edit user:', user);
  };

  const handleDeleteClick = (user) => {
    console.log('Delete user:', user);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const handleAddClick = () => {
    console.log('Add new user clicked');
  };

  const handlePageChange = (page) => {
    listView.setCurrentPage(page);
  };

  return (
    <div className="grid gap-8 p-2 md:p-2">

      <div className="w-full">
        <SummaryHeader handleAddClick={handleAddClick} />
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="w-full">
        <SummaryCards cards={summaryCardsData} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid gap-6">

        {/* ================= FILTERS ================= */}
        <UserListFilters
          tabs={userManagementConfig.filters}
          activeTab={listView.activeFilter}
          onTabChange={handleTabChange}
          searchValue={listView.searchTerm}
          onSearchChange={handleSearchChange}
          onFilterClick={handleFilterClick}
          totalCount={430}
        />

        {/* ================= HEADER + ADD BUTTON ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

          <UserListHeader title="" subtitle="" />


        </div>

        {/* ================= TABLE ================= */}
        <div className="w-full overflow-x-auto">
          <UserListTable
            columns={userManagementConfig.columns}
            data={listView.paginatedData()}
            onViewClick={handleViewClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            showActions={true}
          />
        </div>

        {/* ================= PAGINATION ================= */}
        <div >
          <Pagination
            currentPage={listView.currentPage}
            totalPages={listView.totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={listView.itemsPerPage}
            totalCount={listView.totalCount}
          />
        </div>

      </div>
    </div>
  );

};

export default Users;
