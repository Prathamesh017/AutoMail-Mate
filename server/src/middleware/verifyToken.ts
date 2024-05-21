import { NextFunction, Request, Response } from "express"


// @description - verify with token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res
        .status(403)
        .json({ message: 'A token is required for authentication' })
    }
    try {
      next()
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: 'No Authorization' })
    }
  } else {
    return res.status(401).json({ message: 'No Authorization, No Token' })
  }
}
export default verifyToken