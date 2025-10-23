import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOverviewExample } from './table-overview-example';

describe('TableOverviewExample', () => {
  let component: TableOverviewExample;
  let fixture: ComponentFixture<TableOverviewExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOverviewExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOverviewExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
