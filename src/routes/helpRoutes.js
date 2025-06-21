import { Router } from 'express';
import {
  CreateHelp,
  DeleteHelp,
  GetHelp,
  GetQuites,
} from '../controller/Help.controller.js';

const routes = Router();

routes.route('/create').post(CreateHelp);
routes.route('/get-help').get(GetHelp);
routes.route('/get-quites').get(GetQuites);
routes.route('/delete/:id').delete(DeleteHelp);

export default routes;
