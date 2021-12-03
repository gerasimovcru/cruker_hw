function inherit(ParentClass){

    function ChildClass(){}

    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype._super = ParentClass.prototype;

    return ChildClass;
}





function house(){};

house.prototype.initApartment = function(id){
    this.id = id;
};

house.prototype.infoApartment = function(){
    console.log(this.id);
};




let apartment = inherit(house);
apartment.prototype.initApartment = function(id){
        id = 'ap. ' + id;
        this._super.initApartment.call(this, id);       
}


let apartmentInfo = inherit(apartment)
apartment.prototype.apartmentInfo = function(col, householder){
    this.numberOfPeople = col;
    this.householder = householder;
} 






let House = new house();
let Apartment = new apartment();
let ApartmentInfo = new apartmentInfo(1, 'ivan');



console.log(ApartmentInfo instanceof house)
console.log(ApartmentInfo instanceof apartment)




