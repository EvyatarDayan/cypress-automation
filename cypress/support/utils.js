import axios from 'axios';

export const findLayoutId = (value, layouts) => layouts?.find((layout) => layout.directive === value).layoutId;

export const fetchAllLayouts = async () => {
  const { data } = await axios.get(`${Cypress.env('INTERACTION_PUBLIC_URL')}/engine`);
  const layouts = await axios.get(`${Cypress.env('INTERACTION_PUBLIC_URL')}/engine/${data.payload[0].engineId}/layout`);

  return layouts?.data?.payload;
};
