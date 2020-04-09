import { Request, Response, NextFunction } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import { featureToggle } from '@ciklum-toggler/node-sdk';

import * as package$ from '../../../package.json';

async function get(req: Request, res: Response, next: NextFunction) {
	const packageName = package$.name || 'not specified';
	const packageVersion = package$.version || 'not specified';
	const isEnabled = await featureToggle.isEnabled('FF_FT_19_SET_PASSWORD');

	res.body = isEnabled ? `${packageName}:${packageVersion}` : 'Switch toggler on!';
	res.statusCode = HttpStatusCodes.OK;
	next();
}

export const versionHandler = { get };
