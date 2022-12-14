import { equals } from 'ramda';

import { Is } from '../../logic/is';

export interface ValueObjectProps {
	[index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
	protected readonly props: T;

	protected constructor(props: T) {
		this.props = Object.freeze(props);
	}

	equals(object?: ValueObject<T>): boolean {
		if (!Is.defined(object)) {
			return false;
		}

		if (!(object instanceof ValueObject)) {
			return false;
		}

		return equals(this.props, object.props);
	}
}
