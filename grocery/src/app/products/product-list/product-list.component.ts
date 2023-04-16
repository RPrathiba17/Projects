import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ProductService } from '../product.service';
import { Cart } from '../cart/Cart';
import { Product } from '../product';
import { LoginService } from 'src/app/login/login.service';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    chkty: any = [];
    chkmanos: any = [];
    //rate: number = 0;
    pageTitle = 'Grocery4U';
    imageWidth = 80;
    imageHeight = 120;
    imageMargin = 12;
    showImage = false;
    listFilter: string = '';  
    Type = [{ 'id': 'Oil', 'checked': false },
    { 'id': 'Butter', 'checked': false },
    { 'id': 'Ghee', 'checked': false },
    { 'id': 'Rice', 'checked': false },
    { 'id': 'flour', 'checked': false },
    { 'id': 'Pulses', 'checked': false },
    { 'id': 'fruit', 'checked': false },
    { 'id': 'vegetable', 'checked': false }
    ];
    errorMessage: string = '';
    products: any = [];
    selectedItems: any = 0;
    cart!: Cart;
    total = 0;
    orderId = 0;
    selectedType: string[] = [];
    checkedType: any[] = [];
    sub: any;
    i = 0;
    sortoption = '';
    chkmanosprice: any = [];

    @ViewChild('loginEl')
    loginVal!: ElementRef;
    @ViewChild('welcomeEl')
    welcomeVal!: ElementRef;

    // Fetches the products data from service class
    constructor(private productService: ProductService, private loginService: LoginService, private renderer: Renderer2) {
    }
    ngAfterViewInit() {
        this.loginVal = this.loginService.loginElement;
        this.welcomeVal = this.loginService.welcomeElement;    

        this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
       this.renderer.setStyle(this.welcomeVal.nativeElement, 'display', 'inline');
        let welcomeText="Welcome "+this.loginService.username+ "  "; 
        this.renderer.setProperty(this.welcomeVal.nativeElement, 'innerText', welcomeText);
       this.renderer.setStyle(this.welcomeVal.nativeElement, 'color', 'green');

    }
    ngOnInit() {

        this.orderId++;

        this.productService.getProducts()
            .subscribe({
                next:products => {
                    this.productService.products = products;
                    this.products = this.productService.products; 
                    this.chkmanosprice =this.products
                },
                error:error => this.errorMessage = error});

        if (this.productService.selectedProducts.length > 0) {
            this.selectedItems = Number(sessionStorage.getItem('selectedItems'));
            this.total = Number(sessionStorage.getItem('grandTotal'));
        }
    }
    checkType(ctyp: any[], cProducts: any[], chkty: any[]) {
        if (ctyp.length > 0) {
            for (let checktyp of ctyp) {
                for (let checkProd of cProducts) {
                    if (checkProd.Type.toLowerCase() === checktyp.toLowerCase()) {
                        this.chkty.push(checkProd);


                    }
                }
            }
        } else {
            this.chkty = cProducts;

        }

    }
    // filtering functionality
    filter(name: any) {      
        let checkedProducts: any[];
        this.chkty = [];
        const index = 0;
        checkedProducts = this.productService.products;     
        name.checked = (name.checked) ? false : true;     
        this.checkedType = this.Type.filter(product => product.checked).map(product => product.id);   
        this.checkType(this.checkedType, checkedProducts, this.chkty);
        this.products = this.chkty;
    }


    // Invoked when user clicks on Add to Cart button
    // Adds selected product details to service class variable 
    // called selectedProducts
    addCart(id: number) {
        this.cart = new Cart();
        this.selectedItems += 1;

        // fetching selected product details
        const product = this.productService.products.filter((currProduct: any) => currProduct.productId === id)[0];
        this.total += product.price;
        sessionStorage.setItem('selectedItems', this.selectedItems);
        const sp = this.productService.selectedProducts.filter((currProduct: any) => currProduct.productId === id)[0];
        if (sp) {
            const index = this.productService.selectedProducts.findIndex((currProduct: any) => currProduct.productId === id);
            this.productService.selectedProducts[index].quantity += 1;
            this.productService.selectedProducts[index].totalPrice += product.price;
        } else {
            this.cart.orderId = 'ORD_' + this.orderId;
            this.cart.productId = id;
            this.cart.userId = sessionStorage.getItem('username') + '';
            this.cart.productName = product.productName;
            this.cart.price = product.price;
            this.cart.quantity = 1;
            this.cart.dateOfPurchase = new Date().toString();
            this.cart.totalPrice = product.price * this.cart.quantity;
            this.productService.selectedProducts.push(this.cart);
            sessionStorage.setItem('selectedProducts', JSON.stringify(this.productService.selectedProducts));
            this.orderId++;
        }
    }

    // Search box functionality
    // Searches based on manufacturer name
    searchtext() {
        this.products = this.productService.products;
        if (this.listFilter.length > 0) {
            this.products = this.products.filter((product: Product) =>
                product.productName.toLowerCase().indexOf(this.listFilter) !== -1);
        }
    }

    // Invoked when a tab (Tablets/Mobiles) is clicked
    // Displays tablets or mobiles data accordingly
    tabselect(producttype: string) {
        this.Type = [{ 'id': 'Oil', 'checked': false },
        { 'id': 'Butter', 'checked': false },
        { 'id': 'Ghee', 'checked': false },
        { 'id': 'Rice', 'checked': false },
        { 'id': 'flour', 'checked': false },
        { 'id': 'Pulses', 'checked': false },
        { 'id': 'fruit', 'checked': false },
        { 'id': 'vegetable', 'checked': false }
       ];


        this.products = [];
        this.productService.producttype = producttype;
        this.productService.getProducts().subscribe({
            next: products => {        
                this.products = products;
                this.sortoption='';
            },
            error: error => this.errorMessage = error
        });
      
    }

    // Invoked when user select an option in sort drop down
    // changes the sortoption value accordingly
    onChange(value: string) {
        this.sortoption = value;
    }
}


