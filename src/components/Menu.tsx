import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ContentPaste, Delete, Download } from '@mui/icons-material';
import { downloadInvoice } from './Invoice/downloadinvoice';
import { Invoice, InvoiceItem, Setting, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { deleteInvoice } from '@/app/u/invoice/[id]/deleteInvoice';
import AlertDialog from './deleteDialogue';

export default function BasicMenu({invoice,user}:{invoice:Invoice & {items:InvoiceItem[]}, user:User & {Setting:Setting[]}}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter(); 
  const [openDelete, setOpenDelete] = React.useState(false);
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon/> 
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{
            downloadInvoice(invoice,user)
        }}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
         <MenuItem onClick={()=>{
            router.push("/u/invoice/"+invoice.id)
         }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={()=>{setOpenDelete(true)}} >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

      </Menu>
      <AlertDialog open={openDelete} setOpen={setOpenDelete} deleteInvoice={() => deleteInvoice(invoice.id)}/>
    </div>
  );
}
