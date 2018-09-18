import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import ICompany from '../../../interfaces/ICompany';
import { OrderService } from '../../../services/order.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PositionService } from '../../../services/position.service';
import IPosition from '../../../interfaces/IPosition';

@Component({
    selector: 'app-place-order',
    templateUrl: 'placeorder.dialog.html',
    styleUrls: ['./placeorder.dialog.css']
})
export class PlaceOrderDialogComponent implements OnInit {

    public selectedCompany: ICompany;

    public buyOrderTypes: String[] = [
        'BUY Market Order',
        'BUY Limit Order'
    ];
    private sellOrderTypes: String[] = [
        'SELL Market Order',
        'SELL Limit Order'
    ];
    public buyFormGroup: FormGroup;
    private sellFormGroup: FormGroup;
    public existingPosition: IPosition;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, private order: OrderService,
        private dialog: MatDialog, private position: PositionService) {
        this.selectedCompany = data;
        this.existingPosition = this.position.getPositions(null).find(pos => pos.company._id === this.selectedCompany._id);
        this.buyFormGroup = new FormGroup({
            'orderPrice': new FormControl(this.selectedCompany.lastPrice, [Validators.required, Validators.min(0)]),
            'amount': new FormControl('', [Validators.required, Validators.min(0)]),
            'action': new FormControl('', [Validators.required]),
            'expiration': new FormControl('')
        });
        this.sellFormGroup = new FormGroup({
            'orderPrice': new FormControl(this.selectedCompany.lastPrice, [Validators.required, Validators.min(0)]),
            'amount': new FormControl('',
                [
                    Validators.required,
                    Validators.max((this.existingPosition) ? this.existingPosition.amount : Number.MAX_SAFE_INTEGER)
                ]),
            'action': new FormControl('', [Validators.required]),
            'stopLossEnabled': new FormControl(''),
            'stopLoss': new FormControl(this.selectedCompany.lastPrice, [Validators.min(0)]),
            'expiration': new FormControl(''),
        });
    }

    ngOnInit() {
    }

    placeBuy() {
        if (this.buyFormGroup.valid) {
            this.order.sendOrder({ ...this.buyFormGroup.value, company: this.selectedCompany._id });
            this.dialog.closeAll();
        }
    }

    placeSell() {
        if (this.sellFormGroup.valid) {
            this.order.sendOrder({ ...this.sellFormGroup.value, company: this.selectedCompany._id });
            this.dialog.closeAll();
        }
    }
}
