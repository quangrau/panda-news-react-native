export const UPDATE_SETTING_FILTER = 'UPDATE_SETTING_FILTER';
export const UPDATE_SETTING_LIMIT = 'UPDATE_SETTING_LIMIT';

export function updateSettingFilter(filter) {
  return {
    type: UPDATE_SETTING_FILTER,
    payload: filter,
  };
}

export function updateSettingLimit(limit) {
  return {
    type: UPDATE_SETTING_LIMIT,
    payload: limit,
  };
}
