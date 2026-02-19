import React, { useState } from 'react';
import SummaryHeader from './components/SummaryHeader';
import SummaryCards from './components/SummaryCards';
import UserListHeader from './components/UserListHeader';
import UserListFilters from './components/UserListFilters';
import UserListTable from './components/UserListTable';
import Pagination from './components/Pagination';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import ConfirmModal from '../../../../shared/components/ConfirmModal/ConfirmModal';
import total_user from "../../../../assets/Images/Page_Image/Dashboard/User/Total_User.png"

import { useListView } from './hooks/useListView';

import { userManagementConfig } from './config';

const Users = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToResetPassword, setUserToResetPassword] = useState(null);

  const sampleUserData = [
    { id: 1, username: 'Johndoe', role: 'superadmin', vendor: 'Cleantech solutions' },
    { id: 2, username: 'doeJohn', role: 'admin', vendor: 'Cleantech solutions' },
    { id: 3, username: 'ganesh', role: 'admin', vendor: 'Cleantech solutions' },
    { id: 4, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 5, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 6, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 7, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 8, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 9, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 10, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' },
    { id: 11, username: 'Johndoe', role: 'user', vendor: 'Cleantech solutions' }
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
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('Delete confirmed for user:', userToDelete);
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handlePasswordClick = (user) => {
    setUserToResetPassword(user);
    setIsResetPasswordModalOpen(true);
  };

  const handleResetPasswordSave = (formData) => {
    console.log('Reset password for user:', userToResetPassword, formData);
    setIsResetPasswordModalOpen(false);
    setUserToResetPassword(null);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const handleAddClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleEditSave = (formData) => {
    console.log('Save edited user:', formData);
    setIsEditModalOpen(false);
    setSelectedUser(null);
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
          totalCount={sampleUserData.length}
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
            onPasswordClick={handlePasswordClick}
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

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        userData={selectedUser || {}}
        onSave={handleEditSave}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Are you sure want to delete?"
        description={`This will permanently delete ${userToDelete?.username || 'this user'}'s account. This action cannot be undone.`}
        confirmText="Yes"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => {
          setIsResetPasswordModalOpen(false);
          setUserToResetPassword(null);
        }}
        userData={userToResetPassword || {}}
        onSave={handleResetPasswordSave}
      />
    </div>
  );

};

export default Users;
