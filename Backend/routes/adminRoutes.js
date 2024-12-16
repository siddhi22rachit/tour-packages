import express from 'express';
import {
  addPackage,
  updatePackage,
  deletePackage,
  getPackages,
  getPackagesbyId,
} from '../controllers/adminController.js';

const router = express.Router();

// Add a new package
router.post('/packages', addPackage);

// Update an existing package
router.put('/packages/:id', updatePackage);

// Delete a package
router.delete('/packages/:id', deletePackage);

// Get all packages
router.get('/packages', getPackages);
router.get('/packages/:id', getPackagesbyId);



export default router;
