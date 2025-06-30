import { Router } from 'express';
import {
  CreateHelp,
  DeleteHelp,
  GetHelp,
  GetQuites,
  UpdateRemark,
} from '../controller/Help.controller.js';

const routes = Router();

routes.route('/create').post(CreateHelp);
routes.route('/get-help').get(GetHelp);
routes.route('/get-quites').get(GetQuites);
routes.route('/delete/:id').delete(DeleteHelp);
routes.route('/update-remark/:id').put(UpdateRemark);

export default routes;
