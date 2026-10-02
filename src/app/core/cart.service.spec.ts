import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from './api.models';

function product(id: number, price: string): Product {
  return { id, name: `Produto ${id}`, description: null, price, store_id: 1 };
}

describe('CartService', () => {
  let cart: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cart = TestBed.inject(CartService);
  });

  it('começa vazio', () => {
    expect(cart.count()).toBe(0);
    expect(cart.total()).toBe(0);
  });

  it('soma a quantidade em vez de duplicar a linha', () => {
    cart.add(product(1, '100.0'));
    cart.add(product(1, '100.0'));

    expect(cart.items().length).toBe(1);
    expect(cart.count()).toBe(2);
  });

  it('soma preço x quantidade de todas as linhas', () => {
    cart.add(product(1, '1890.5'));
    cart.add(product(2, '250.0'));
    cart.add(product(2, '250.0'));

    expect(cart.total()).toBe(2390.5);
  });

  it('remove a linha inteira pelo id do produto', () => {
    cart.add(product(1, '10.0'));
    cart.add(product(2, '20.0'));

    cart.remove(1);

    expect(cart.items().map((line) => line.product.id)).toEqual([2]);
  });

  it('esvazia tudo', () => {
    cart.add(product(1, '10.0'));
    cart.clear();

    expect(cart.count()).toBe(0);
  });
});
