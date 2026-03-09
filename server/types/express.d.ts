/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Global type augmentations for Express Request interfaces. 
 */
import {Request} from 'express'

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}