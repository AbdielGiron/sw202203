import { Router} from 'express';

import CashFlowRouter  from './CashFlows';
import user  from './users';


const router  = Router();

// http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', CashFlowRouter);
router.use('/users', user);

export default router;
