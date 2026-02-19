import React from 'react';
import EditIcon from "../../../../../assets/Images/Icons/Modifications/Edit.png";
import DeleteIcon from "../../../../../assets/Images/Icons/Modifications/Delete.png";
import PasswordIcon from "../../../../../assets/Images/Icons/Modifications/Password.png";
import Button from '../../../../../shared/components/UI/Button/Button';
import Table from "../../../../../shared/components/UI/Table/Table";



const UserListTable = ({
    columns = [],
    data = [],
    onViewClick = () => { },
    onEditClick = () => { },
    onDeleteClick = () => { },
    onPasswordClick = () => { },
    showActions = true
}) => {
    if (!columns.length) return null;

    const renderActions = (row) => (
        <div className="flex gap-2 items-center">
            <Button variant="icon" size="icon" onClick={() => onEditClick(row)}>
                <img src={EditIcon} alt="Edit"  />
            </Button>

            <Button variant="icon" size="icon" onClick={() => onDeleteClick(row)}>
                <img src={DeleteIcon} alt="Delete"  />
            </Button>

            <Button variant="icon" size="icon" onClick={() => onPasswordClick(row)}>
                <img src={PasswordIcon} alt="Password"  />
            </Button>
        </div>
    );

    return (
        // <div className="w-full bg-white border border-[var(--color-neutral-20)] rounded-2xl overflow-hidden">
        //     <table className="w-full border-collapse">
        //         <thead>
        //             <tr className="border-b-2 border-[var(--color-text-title)]">
        //                 {columns.map((column) => (
        //                     <th
        //                         key={column.key}
        //                         className="px-5 py-6 text-left font-semibold text-base leading-5 text-[var(--color-text-title)] font-['Outfit',sans-serif] border-r border-[var(--color-neutral-20)] last:border-r-0"
        //                     >
        //                         {column.label}
        //                     </th>
        //                 ))}
        //                 {showActions && (
        //                     <th className="px-5 py-6 text-left font-semibold text-base leading-5 text-[var(--color-text-title)] font-['Outfit',sans-serif]">
        //                         Action
        //                     </th>
        //                 )}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {data.length === 0 ? (
        //                 <tr>
        //                     <td
        //                         colSpan={columns.length + (showActions ? 1 : 0)}
        //                         className="px-5 py-6 text-center text-base font-normal leading-5 text-[var(--color-neutral-40)] font-['Outfit',sans-serif]"
        //                     >
        //                         No data available
        //                     </td>
        //                 </tr>
        //             ) : (
        //                 data.map((row, rowIndex) => (
        //                     <tr
        //                         key={rowIndex}
        //                         className="border-b border-[var(--color-neutral-20)] hover:bg-[var(--color-neutral-10)] transition-colors duration-150 last:border-b-0"
        //                     >
        //                         {columns.map((column) => (
        //                             <td
        //                                 key={`${rowIndex}-${column.key}`}
        //                                 className="px-5 py-6 text-base font-normal leading-5 text-[var(--color-text-paragraph)] font-['Outfit',sans-serif] border-r border-[var(--color-neutral-20)] last:border-r-0"
        //                             >
        //                                 {column.render
        //                                     ? column.render(row[column.key], row, rowIndex)
        //                                     : row[column.key]}
        //                             </td>
        //                         ))}
        //                         {showActions && (
        //                             <td className="px-5 py-6">
        //                                 <div className="flex gap-2 items-center">


        //                                     <Button
        //                                         variant="icon"
        //                                         onClick={() => onEditClick(row)}
        //                                         size="icon"
        //                                     >
        //                                         <img src={EditIcon} alt="Edit" />
        //                                     </Button>

        //                                     <Button
        //                                         variant="icon"
        //                                         onClick={() => onDeleteClick(row)}
        //                                         size="icon"
        //                                     >
        //                                         <img src={DeleteIcon} alt="Delete" className="w-full h-auto" />
        //                                     </Button>
        //                                     <Button
        //                                         variant="icon"
        //                                         onClick={() => onDeleteClick(row)}
        //                                         size="icon"
        //                                     >
        //                                         <img src={PasswordIcon} alt="password" className="w-full h-auto" />
        //                                     </Button>



        //                                 </div>
        //                             </td>
        //                         )}
        //                     </tr>
        //                 ))
        //             )}
        //         </tbody>
        //     </table>
        // </div>



        <Table
            columns={columns}
            data={data}
            actions={renderActions}
            emptyMessage="No users found"
        />

    );
};

export default UserListTable;
