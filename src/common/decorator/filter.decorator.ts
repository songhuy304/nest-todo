import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

export interface Filtering {
  property: string;
  rule: FilterRule;
  value: string | string[];
}

export enum FilterRule {
  EQUALS = 'eq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  IN = 'in',
  CONTAINS = 'contains',
}

export const FilteringParams = (validParams: string[]) =>
  createParamDecorator((_data: unknown, ctx: ExecutionContext): Filtering[] => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const query = request.query;

    if (!query || typeof query !== 'object') {
      return [];
    }

    return Object.entries(query)
      .map(([key, value]) => {
        if (typeof value !== 'string') {
          return null;
        }
        return parseFilterParam(key, value, validParams);
      })
      .filter((filter): filter is Filtering => filter !== null);
  })();

function parseFilterParam(
  key: string,
  value: string,
  validParams: string[],
): Filtering | null {
  const [property, rule] = key.split('.');

  if (!validParams.includes(property)) {
    return null;
  }

  validateFilterRule(rule, property);

  const parsedValue = parseFilterValue(value, rule as FilterRule);

  return {
    property,
    rule: rule as FilterRule,
    value: parsedValue,
  };
}

function validateFilterRule(rule: string, property: string): void {
  const validRules = Object.values(FilterRule) as string[];

  if (!validRules.includes(rule)) {
    throw new BadRequestException(
      `Invalid filter rule '${rule}' for property '${property}'. Valid rules: ${validRules.join(', ')}`,
    );
  }
}

function parseFilterValue(value: string, rule: FilterRule): string | string[] {
  if (rule === FilterRule.IN) {
    return value.split(',').map((v) => v.trim());
  }

  return value;
}
