
import * as addressService from "./address.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

export const createAddress = asyncHandler(async (req: Request, res: Response) => {
    const result = await addressService.createAddress(req.body);
    res.send(createResponse(result, "User created sucssefully"))
});

// export const updateUser = asyncHandler(async (req: Request, res: Response) => {
//     const result = await userService.updateUser(req.params.id, req.body);
//     res.send(createResponse(result, "User updated sucssefully"))
// });

// export const editUser = asyncHandler(async (req: Request, res: Response) => {
//     const result = await userService.editUser(req.params.id, req.body);
//     res.send(createResponse(result, "User updated sucssefully"))
// });

export const deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const result = await addressService.deleteAddress(req.params.id);
    res.send(createResponse(result, "User deleted sucssefully"))
});


// export const getUserById = asyncHandler(async (req: Request, res: Response) => {
//     const result = await userService.getUserById(req.params.id);
//     res.send(createResponse(result))
// });


export const getAddress = asyncHandler(async (req: Request, res: Response) => {
    const result = await addressService.getAddresses();
    res.send(createResponse(result))
});
