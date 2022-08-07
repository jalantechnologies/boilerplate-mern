import {
  NextFunction, Response, Request,
} from 'express';
import ConfigService from '../../config/config-service';

export default class InspectletController {
  public static getKey(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    try {
      const wid = ConfigService.getIntValue('inspectlet.wid');
      res.status(200).send(InspectletController.serializeKeyAsJSON(wid));
    } catch (e) {
      next(e);
    }
  }

  private static serializeKeyAsJSON(wid: number): unknown {
    return {
      key: wid,
    };
  }
}
