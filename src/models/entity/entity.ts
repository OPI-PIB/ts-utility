import { Is } from '../../logic/is';
import { ValueObject } from '../value-object/value-object';

export interface EntityProps {
	id: ValueObject<any>;
	[key: string]: any;
}

/**
 * @desc Entities are objects that we determine their
 * equality through their identifier.
 */

export abstract class Entity<T extends EntityProps> {
	protected readonly props: T;

	protected constructor(props: T) {
		this.props = Object.freeze(props);
	}

	equals(object: Entity<T>): boolean {
		if (!Is.defined(object)) {
			return false;
		}

		if (this === object) {
			return true;
		}

		if (!(object instanceof Entity)) {
			return false;
		}

		return this.props.id.equals(object.props.id);
	}
}
