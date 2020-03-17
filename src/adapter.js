export const mapToClient = (data) => {
  const result = {};

  result.id = data[`id`];
  result.title = data[`title`];
  result.previewImage = data[`preview_image`];
  result.price = data[`price`];
  result.rating = data[`rating`];
  result.type = data[`type`];
  result.bedrooms = data[`bedrooms`];
  result.maxAdults = data[`max_adults`];
  result.isFavorite = data[`is_favorite`];
  result.isPremium = data[`is_premium`];
  result.location = {};
  result.location.latitude = data[`location`][`latitude`];
  result.location.longitude = data[`location`][`longitude`];
  result.location.zoom = data[`location`][`zoom`];
  result.city = {};
  result.city.name = data[`city`][`name`];
  result.city.location = {};
  result.city.location.latitude = data[`city`][`location`][`latitude`];
  result.city.location.longitude = data[`city`][`location`][`longitude`];
  result.city.location.zoom = data[`location`][`zoom`];

  result.description = data[`description`];
  result.goods = data[`goods`];
  result.hostAvatarUrl = data[`host`][`avatar_url`];
  result.hostId = data[`host`][`id`];
  result.hostIsPro = data[`host`][`is_pro`];
  result.hostName = data[`host`][`name`];
  result.images = data[`images`];

  return result;
};
