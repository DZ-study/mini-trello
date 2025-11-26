import jwt, { type SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

// TODO: 默认秘钥怎么设置
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-for-jwt-tokens-2024';
const DEFAULT_JWT_EXPIRES_IN: StringValue = '7d';

const resolveExpiresIn = (value?: string): SignOptions['expiresIn'] => {
    if (!value) {
        return DEFAULT_JWT_EXPIRES_IN;
    }

    const numericValue = Number(value);
    if (!Number.isNaN(numericValue)) {
        return numericValue;
    }

    return value as StringValue;
};

const JWT_EXPIRES_IN = resolveExpiresIn(process.env.JWT_EXPIRES_IN);

export function generateToken(payload: { id: string, email: string }): string {
    if (typeof payload !== 'object' || !payload.id) {
        return ''
    }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    })
}

export function verifyToken(token: string): { id: string, email: string } | null{
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    } catch (error) {
        return null;
    }
}