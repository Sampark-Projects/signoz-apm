import { Dashboard, DashboardTemplate } from 'types/api/dashboard/getAll';

// Tags may come back as `{key, value}` objects even though the
// Dashboard type declares them as strings; normalise defensively.
export const normalizeDashboardTags = (
	tags: Dashboard['data']['tags'],
): string[] =>
	(tags ?? []).map((tag) => {
		if (typeof tag === 'string') {
			return tag;
		}
		const tagObj = tag as unknown as { key: string; value?: string };
		return tagObj.value ? `${tagObj.key}:${tagObj.value}` : tagObj.key;
	});

export const filterDashboards = (
	searchValue: string,
	dashboardList: Dashboard[],
): Dashboard[] => {
	const searchValueLowerCase = searchValue?.toLowerCase();

	// Filter by title, description, tags
	return dashboardList.filter((item: Dashboard) => {
		const { title, description, tags } = item.data;
		const itemValuesNew = [title, description];

		if (tags && tags.length > 0) {
			itemValuesNew.push(...normalizeDashboardTags(tags));
		}

		// Check if any property value contains the searchValue
		return itemValuesNew.some((value) => {
			if (value) {
				return value.toLowerCase().includes(searchValueLowerCase);
			}

			return false;
		});
	});
};

export const filterTemplates = (
	searchValue: string,
	dashboardList: DashboardTemplate[],
): DashboardTemplate[] => {
	const searchValueLowerCase = searchValue?.toLowerCase();

	return dashboardList.filter((item: DashboardTemplate) => {
		const { name } = item;

		// Check if any property value contains the searchValue
		return name.toLowerCase().includes(searchValueLowerCase);
	});
};

export interface DashboardDynamicColumns {
	createdAt: boolean;
	createdBy: boolean;
	updatedAt: boolean;
	updatedBy: boolean;
}

export enum DynamicColumns {
	CREATED_AT = 'createdAt',
	CREATED_BY = 'createdBy',
	UPDATED_AT = 'updatedAt',
	UPDATED_BY = 'updatedBy',
}
