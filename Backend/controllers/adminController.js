import Package from '../models/Package.js';

// @desc Add a new package
// @route POST /admin/packages
export const addPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json({ message: 'Package added successfully', data: newPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error adding package', error: error.message });
  }
};

// @desc Update an existing package
// @route PUT /admin/packages/:id
export const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package updated successfully', data: updatedPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
};

// @desc Delete a package
// @route DELETE /admin/packages/:id
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error: error.message });
  }
};

// @desc Get all packages
// @route GET /admin/packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({ data: packages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
};

export const getPackagesbyId = async (req,res)=>{

  const packageId = req.params.id;
  
  try {
    // Fetch package details from your database using the packageId
    const packageone = await Package.findById(packageId); // or your database query
    if (!packageone) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(packageone);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch package details', error });
  }
}

