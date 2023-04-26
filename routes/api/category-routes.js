const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryGet = await Category.findAll({
      include:[{model: Product}]
    });
    res.status(200).json(categoryGet);
  } catch(err){
    res.status(500).json(err)
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryGetID = await Category.findByPk(req.params.id, {
      inclide: [{model: Product}]
    });
    if (!categoryGetID) {
      res.status(404).json({message: 'No category with this ID'});
      return;
    }
    res.status(200).json(categoryGetID);
  } catch (err){
    res.status(500).json(err);
  };
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryPost = await Category.create(req.body);
    res.status(200).json(categoryPost);
  } catch(err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const categoryPut = await Category.update(req.body, {
    where:{
      id: req.params.id,
    }
  });
  res.status(200).json(categoryPut);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryDelete) {
      res.status(404).json({message: 'No category with ID'});
      return;
    }
    res.status(200).json(categoryDelete);
  } catch(err) {
    res.status.apply(500).json(err);
  };
});

module.exports = router;
