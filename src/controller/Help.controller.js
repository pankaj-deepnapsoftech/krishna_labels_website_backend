import { HelpAndQuiteModal } from '../models/help&quite.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { HelpValidation } from '../validation/Help.js';

export const CreateHelp = AsyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const newData = HelpValidation.validateSync(data, { abortEarly: false });
    const result = await HelpAndQuiteModal.create(newData);
    return res.status(201).json({
      message: 'Detail Send our Team we will get back to you letter',
      result,
    });
  } catch (err) {
    if (err.inner) {
      const errors = err.inner.map((e) => ({
        path: e.path,
        message: e.message,
      }));
      return res.status(400).json({ errors });
    } else {
      console.error('Unexpected error:', err);
    }
  }
});

export const GetHelp = AsyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const pages = parseInt(page) || 1;
  const limits = parseInt(limit) || 10;
  const skip = (pages - 1) * limits; 

  const data = await HelpAndQuiteModal.find({ type: 'Help' })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limits);
  return res.status(200).json({
    message: 'helps',
    data,
  });
});

export const GetQuites = AsyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const pages = parseInt(page) || 1;
  const limits = parseInt(limit) || 10;
  const skip = (pages - 1) * limits;

  const data = await HelpAndQuiteModal.find({ type: 'Quites' })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limits);
  return res.status(200).json({
    message: 'helps',
    data,
  });
});

export const DeleteHelp = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const find = await HelpAndQuiteModal.findById(id);
  if (!find) {
    return res.status(400).json({
      message: 'Data Already Deleted',
    });
  }
  await HelpAndQuiteModal.findByIdAndDelete(id);
  return res.status(200).json({
    message: 'data deleted Successful',
  });
});
