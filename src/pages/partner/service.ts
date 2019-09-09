import request from '@/utils/request';
import { PartnersParams } from '@/pages/partner/data';

export async function create(params: PartnersParams) {
  return request('/api/partners/create', {
    params,
  });
}

export async function update(params: PartnersParams) {
  return request('/api/partners/create', {
    params,
  });
}


export async function fetchSimpleList(params: PartnersParams) {
  return request('/api/partners/fetch/simple_list', {
    params,
  });
}

export async function fetchPartnerList(params: PartnersParams) {
  return request('/api/partners/fetch/partner_list', {
    params,
  });
}
