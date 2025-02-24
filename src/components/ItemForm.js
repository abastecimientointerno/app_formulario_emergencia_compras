import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemForm = ({ index, item, updateItem, removeItem, isLast }) => {
  return (
    <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary">
            Artículo #{index + 1}
          </Typography>
          {!isLast && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton color="error" onClick={() => removeItem(index)}>
              <DeleteIcon />
            </IconButton>
            </motion.div>
          )}
        </Box>

        <TextField
          fullWidth
          label="Código SAP del material"
          value={item.sapCode || ''}
          onChange={(e) => updateItem(index, 'sapCode', e.target.value)}
          required
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Descripción del material"
          value={item.description || ''}
          onChange={(e) => updateItem(index, 'description', e.target.value)}
          required
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Cantidad requerida"
          type="number"
          value={item.quantity || ''}
          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
          required
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Unidad de medida"
          value={item.unit || ''}
          onChange={(e) => updateItem(index, 'unit', e.target.value)}
          required
          sx={{ mt: 2 }}
        />

        <TextField
          select
          fullWidth
          label="¿Se requiere creación de código en SAP?"
          value={item.requiresSapCode || ''}
          onChange={(e) => updateItem(index, 'requiresSapCode', e.target.value)}
          required
          sx={{ mt: 2 }}
        >
          {['Sí', 'No'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="¿Se cuenta con Reserva?"
          value={item.hasReserve || ''}
          onChange={(e) => updateItem(index, 'hasReserve', e.target.value)}
          required
          sx={{ mt: 2 }}
        >
          {['Sí', 'No'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="¿Se cuenta con Solped?"
          value={item.hasSolped || ''}
          onChange={(e) => updateItem(index, 'hasSolped', e.target.value)}
          required
          sx={{ mt: 2 }}
        >
          {['Sí', 'No'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Tipo de Avería (Opcional)"
          value={item.breakdownType || ''}
          onChange={(e) => updateItem(index, 'breakdownType', e.target.value)}
          sx={{ mt: 2 }}
        >
          {['Avería A', 'Avería B', 'Avería C'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Proveedor sugerido (Opcional)"
          value={item.suggestedProvider || ''}
          onChange={(e) => updateItem(index, 'suggestedProvider', e.target.value)}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
};

export default ItemForm;