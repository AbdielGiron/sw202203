import {Router} from 'express';
//crear
import { IUser, User } from '@libs/Users';

const router = Router();
const UserInstance = new User();

router.get('/', async (_req, res)=>{
  try {
    res.json(await UserInstance.getAllUser());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({error:ex});
  }
});

router.get('/byindex/:index', async (req, res) => {
  try {
    const { index } = req.params;
    res.json(await UserInstance.getUserByIndex(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});


router.post('/new', async (req, res)=>{
  try {
    const newUser = req.body as unknown as IUser;
    //VALIDATE

    const newUserIndex = await UserInstance.addUser(newUser);
    res.json({newIndex: newUserIndex});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.put('/update/:index', async (req, res)=>{
  try {
    const { index } = req.params;
    const userFromForm = req.body as IUser;
    await UserInstance.updateUser(+index, userFromForm);
    res.status(200).json({"msg":"Registro Actualizado"});
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.delete('/delete/:index', (req, res)=>{
  try {
    const { index } = req.params;
    if (UserInstance.deleteUser(+index)) {
      res.status(200).json({"msg": "Registro Eliminado"});
    } else {
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al eliminar Registro'});
  }
});


export default router;
