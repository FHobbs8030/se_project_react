import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';
import Item from '../models/item.js';
import auth from '../middlewares/auth.js';

const router = Router();

const objectId = Joi.string().custom((v, helpers) =>
  Types.ObjectId.isValid(v) ? v : helpers.error('any.invalid')
);

// List all items (public or adjust as needed)
router.get('/items', async (_req, res, next) => {
  try {
    const items = await Item.find({}).lean();
    res.send(items);
  } catch (e) { next(e); }
});

// Create item (must be logged in)
router.post(
  '/items',
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).max(30).required(),
      weather: Joi.string().valid('hot', 'warm', 'cold').required(),
      imageUrl: Joi.string().uri().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { name, weather, imageUrl } = req.body;
      const item = await Item.create({
        name,
        weather,
        imageUrl,
        owner: req.user._id,
      });
      res.status(201).send(item);
    } catch (e) { next(e); }
  }
);

// Owner-only delete
router.delete(
  '/items/:itemId',
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({ itemId: objectId.required() }),
  }),
  async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const item = await Item.findById(itemId).select('+owner');
      if (!item) return res.status(404).send({ message: 'Item not found' });
      if (String(item.owner) !== String(req.user._id)) {
        return res.status(403).send({ message: 'Forbidden: not the owner' });
      }
      await item.deleteOne();
      return res.send({ message: 'Item deleted' });
    } catch (e) { next(e); }
  }
);

// Optional: likes
router.put(
  '/items/:itemId/likes',
  auth,
  celebrate({ [Segments.PARAMS]: Joi.object({ itemId: objectId.required() }) }),
  async (req, res, next) => {
    try {
      const updated = await Item.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      );
      if (!updated) return res.status(404).send({ message: 'Item not found' });
      res.send(updated);
    } catch (e) { next(e); }
  }
);

router.delete(
  '/items/:itemId/likes',
  auth,
  celebrate({ [Segments.PARAMS]: Joi.object({ itemId: objectId.required() }) }),
  async (req, res, next) => {
    try {
      const updated = await Item.findByIdAndUpdate(
        req.params.itemId,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      if (!updated) return res.status(404).send({ message: 'Item not found' });
      res.send(updated);
    } catch (e) { next(e); }
  }
);

export default router;
