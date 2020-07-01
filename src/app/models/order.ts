import {Status} from './status';
import {Receipt} from './receipt';
import {OrderType} from './orderType';
import {Destination} from './destination';

export class Order {
  id: number;
  description: '';
  destinationCityFrom: '';
  destinationCityTo: '';
  type: '';
  weight: number;
  status: Status;
  shippingDate: '';
  deliveryDate: '';
  shippingPriceInCents: number;
  receipt: Receipt;
  orderType: OrderType;
  destination: Destination;
}
