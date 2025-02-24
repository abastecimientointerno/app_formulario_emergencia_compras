import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ItemForm from './components/ItemForm';

const App = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [items, setItems] = useState([{}]);
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const generateTicketId = () => `ticket-${Math.floor(10000 + Math.random() * 90000)}`;

  const addItem = () => {
    setItems([...items, {}]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const onSubmit = async (data) => {
    const newTicketId = generateTicketId();
    const formData = {
      fecha_de_solicitud: new Date().toISOString().split('T')[0],
      nombre_del_solicitante: data.name,
      email_del_solicitante: data.email,
      area_del_solicitante: area,
      unidad_operativa: unit,
      planta_o_ep: data.plant,
      id_ticket: newTicketId,
      estado_ticket: 'Nuevo',
      items: items.map((item) => ({
        se_requiere_creacion_de_codigo_en_sap: item.requiresSapCode || '',
        codigo_sap_del_material: item.sapCode || '',
        descripcion_del_material: item.description || '',
        cantidad_requerida: parseInt(item.quantity) || 0,
        unidad_medida: item.unit || '',
        se_cuenta_con_reserva: item.hasReserve || '',
        se_cuenta_solped: item.hasSolped || '',
        tipo_de_averia: item.breakdownType || '',
        proveedor_sugerido: item.suggestedProvider || '',
      })),
      asignado_a: '',
      comentario_comprador: '',
    };

    try {
      const response = await axios.post('https://prod-13.brazilsouth.logic.azure.com:443/workflows/23469e42e13349368d1d4631ab5c08e8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fkaK-S90bycAAjupSc9v5QA_9cY8VsvX13JGr4Vceos', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200 || response.status === 202) {
        setTicketId(newTicketId);
        setOpenDialog(true); // Abrir el diálogo
      } else {
        alert(`Error al enviar: ${response.status}`);
      }
    } catch (error) {
      alert(`Error de conexión: ${error.message}`);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
    setItems([{}]);
    setArea('');
    setUnit('');
  };

  const fishAnimation = {
    swim: {
      x: [0, 50, 0, -50, 0],
      rotate: [0, 10, 0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Solicitud de compra de emergencia
        </Typography>
      </motion.div>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Fecha de solicitud:
              </Typography>
              <Typography variant="body1">{currentDate}</Typography>
            </Box>

            <TextField
              fullWidth
              label="Nombre del solicitante"
              {...register('name', { required: 'Campo obligatorio' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email del solicitante"
              {...register('email', {
                required: 'Campo obligatorio',
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: 'Email inválido',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Área del solicitante"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              error={!area && Object.keys(errors).length > 0}
              helperText={!area && Object.keys(errors).length > 0 ? 'Campo obligatorio' : ''}
              sx={{ mb: 2 }}
            >
              {['CCM', 'Mannto Flota', 'Mantto Pesca', 'Producción'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Unidad Operativa"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              error={!unit && Object.keys(errors).length > 0}
              helperText={!unit && Object.keys(errors).length > 0 ? 'Campo obligatorio' : ''}
              sx={{ mb: 2 }}
            >
              {['Pesca', 'Planta'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Planta o Embarcación pesquera"
              {...register('plant', { required: 'Campo obligatorio' })}
              error={!!errors.plant}
              helperText={errors.plant?.message}
              sx={{ mb: 2 }}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Artículos
            </Typography>

            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ItemForm
                  index={index}
                  item={item}
                  updateItem={updateItem}
                  removeItem={removeItem}
                  isLast={items.length === 1}
                />
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addItem}
                fullWidth
                sx={{ mt: 2, mb: 3 }}
              >
                Añadir Artículo
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Enviar Solicitud
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {/* Diálogo de Confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{ sx: { borderRadius: 2, p: 2 } }}
      >
        <DialogTitle sx={{ color: 'success.main', textAlign: 'center' }}>
          ¡Solicitud Enviada!
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <motion.div
              variants={fishAnimation}
              animate="swim"
              style={{ fontSize: '40px' }}
            >
              🐟
            </motion.div>
          </Box>
          <Typography variant="body1" align="center">
            Tu solicitud ha sido enviada con éxito.<br />
            <strong>ID: {ticketId}</strong><br />
            En breve recibirás un correo de confirmación con la información enviada.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
            sx={{ px: 4 }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;