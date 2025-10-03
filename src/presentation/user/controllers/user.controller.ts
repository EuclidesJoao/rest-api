import { Request, Response, NextFunction } from 'express';
import { getController } from '../../../base/controller';
import userSe
import userService from '../services/user.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { firebaseHandler } from '../../lib/firebase-handler';
import { emailSender } from '../../lib/email-sender';
import { throwBadRequest } from '../../base/middlewares/error-handler';

const FILE_MISSING_ERROR_MESSAGE = `Precisa de seleccionar uma para o perfil.`;

async function setProfilePhotoUrl(request: Request, file: Express.Multer.File) {
  const profilePhotoUrl = await firebaseHandler.fileUpload(file);
  Object.assign(request.body, { profilePhotoUrl });
}

function removeProfilePhotoUrl(request: Request) {
  const { profilePhotoUrl = '' } = request.body;
  firebaseHandler.deleteFileFromURLReference(profilePhotoUrl);
}

function convertForeignKeyToNumber(request: Request) {
  const fkUserType = Number.parseInt(request.body?.fkUserType);
  request.body.fkUserType = fkUserType || 0;
}

function sendAccountCreatedConfirmation(request: Request) {
  const { email: to = '' } = request.body;
  const subject = `Conta no Intermediário`;
  const text = `A sua conta foi criada.`;

  emailSender.sendMail(to, subject, text);
}

export class UserController extends getController(userService, CreateUserDTO) {
  static override async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    console.log("Hello from UserController create method");
    const { file } = request;
    convertForeignKeyToNumber(request);
    
    

    if (!file) {
      throwBadRequest(FILE_MISSING_ERROR_MESSAGE);
    }
    else {
      await setProfilePhotoUrl(request, file);
    }

    try {
      await userService.create(request.body);
      sendAccountCreatedConfirmation(request);
      
      return response.status(201).json();
    } catch (error) {
      removeProfilePhotoUrl(request);
      next(error);
    }
  }

  static override async updateById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { file } = request;
    const id = Number.parseInt(request.params.id);
    let oldPhotoReference = '';

    convertForeignKeyToNumber(request);

    if (file) {
      const user = await userService.findById(id);
      if (user) {
        oldPhotoReference = user.profilePhotoUrl;
        setProfilePhotoUrl(request, file);
      }
    }
    try {
      await userService.updateById(id, request.body);
      firebaseHandler.deleteFileFromURLReference(oldPhotoReference);
      return response.status(200).json();
    } catch (error) {
      removeProfilePhotoUrl(request);
      next(error);
    }
  }

  static override async deleteById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const user = await userService.findById(Number.parseInt(request.params.id));
    if (user) {
      firebaseHandler.deleteFileFromURLReference(user.profilePhotoUrl);
    }
    return await super.deleteById(request, response, next);
  }
}
