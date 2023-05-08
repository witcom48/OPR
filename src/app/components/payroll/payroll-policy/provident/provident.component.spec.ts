import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidentComponent } from './provident.component';

describe('ProvidentComponent', () => {
    let component: ProvidentComponent;
    let fixture: ComponentFixture<ProvidentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProvidentComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProvidentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
