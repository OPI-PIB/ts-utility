import { ValueObject } from '../../..';
import { IdProps } from './id.props';

export class Id extends ValueObject<IdProps> {
	private constructor(protected readonly props: IdProps) {
		super(props);
	}

	static create(id: string): Id {
		return new Id({ id });
	}
}
