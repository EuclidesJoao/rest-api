// import { plainToInstance } from 'class-transformer';
// import { Request, Response, NextFunction } from 'express';
// import { validate, ValidationError } from 'class-validator';

// async function getRequestProperties<T extends object>(
//   request: Request,
//   dtoClass: new () => T,
// ) {
//   const { body = {} } = request;
//   const dtoInstance = plainToInstance(dtoClass, body);
//   const errors: ValidationError[] = await validate(dtoInstance, {
//     whitelist: true,
//   });

//   return {
//     body,
//     dtoInstance,
//     errors,
//   };
// }

// export function verifyCreateRequestBody<T extends object>(
//   dtoClass: new () => T,
// ) {
//   return async (request: Request, response: Response, next: NextFunction) => {
//     const { body, errors } = await getRequestProperties(request, dtoClass);

//     if (errors.length) {
//       const errorMessages = errors
//         .map((error) => Object.values(error.constraints || {}))
//         .flat();
//       response.status(400).json({ message: errorMessages });
//       return;
//     }
//     Object.assign(request, { body });
//     next();
//   };
// }

// export function verifyUpdateRequestBody<T extends object>(
//   dtoClass: new () => T,
// ) {
//   return async (request: Request, response: Response, next: NextFunction) => {
//     const { body, dtoInstance, errors } = await getRequestProperties(
//       request,
//       dtoClass,
//     );

//     if (errors.length) {
//       const errorMessages = errors.map((error) => error.property);

//       if (!Object.keys(dtoInstance).length) {
//         response.status(400).json({
//           message: `Pelo menos uma das propriedades deve estar presente para actualizar, segue a lista: [${errorMessages}].`,
//         });
//         return;
//       }
//     }
//     Object.assign(request, { body });
//     next();
//   };
// }

