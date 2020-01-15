/* backbone methods of app
var budgetController = (function(){
    //closure + IIFE
    var x = 23;
    
    var add = function(a){
        return x + a;
    }
    
    return {
        publicTest : function(b){
            return add(b);
        }
    }
})();




//UI CONTROLLER 

var UIController = (function(){
    //IIFE

    
    //some code
    
})();




var controller = (function(budgetCtrl , UICtrl){
    //IIFE
    
    
    var z = budgetCtrl.publicTest(5);
    
    return { //we have to make this return with method and function in it to return value to public area
        publicMethod : function(){
            console.log(z);
        }
    }
    
    
    
    
})(budgetController , UIController);

*/



//BUDGET CONTROLLER
var budgetController = (function(){ ///////////////////////////////////////////////////////


    //FUNCTION CONSTRUCTURES
    
    var Expense = function(id, descprition , value){
        this.id = id;
        this.description = descprition ;
        this.value = value;
    }    
    var Income = function(id, descprition , value){
        this.id = id;
        this.description = descprition ;
        this.value = value;
    };
    
    //using data structure in place of var defining.
    //obj --> data --> all items:
    //obj --> data --> totals:

    
    
    var calculateTotal = function(type){
        var sum = 0;
        
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        
        data.totals[type] = sum;
}
    
    
    
    var data = {
        
        allItems:{
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percetage : -1,
    };
    
    return {
        addItem : function(type , desc , val){
            var ID , newItem ;
            
            //[1 2 3 4 5 ] new id = 6
            //[1 2 4 6 8 ] new id = 9
            // ID - lastID +1
            
            //Create new ID
            //in Start id is 0 -1 . so making ID = 0 for start to make it working. 
            if(data.allItems[type].length > 0 ){
            
            ID = data.allItems[type][data.allItems[type].length -1].id+1;            
            }
            else {
                ID = 0;
            }
            
            //create new item based on inc or exp 
            if(type === 'exp')
            {
            newItem = new Expense (ID , desc, val);
            }else
                {
            newItem = new Income(ID, desc , val);
                }
            
            //push newly created item on our data structure using push.
            data.allItems[type].push(newItem);
            
            //return new element to be used gloablly. 
            return newItem;
            
        },
        
        
        deleteItem : function(type , id){
          
            
            //id = 6 
            //data.allItems[type][id];
            //ids = [1 2 4 6 8]
            //indes = 3
            
            
            ids = data.allItems [type].map(function(current){
               return current.id; 
            });
            
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index , 1);
            }
            
            
            
            
        },
        
        
        
         calculateBudget: function(){
        
            //Calculate total budget  income and expense
            calculateTotal('exp');
            calculateTotal('inc');
        
            //calculate the budget : income - expense
        
            data.budget = data.totals.inc - data.totals.exp;    
        
            //calculate the percentage of income  that  we spent
             if(data.totals.inc > 0 ){
             
            data.percetage =Math.round( (data.totals.exp / data.totals.inc) * 100);
             }else{ 
                data.percetage = -1; // -1 means non existance.
             }
         },
        
        
        
         getBudget : function(){
          return {
              budget : data.budget,
              totalInc : data.totals.inc,
              totalExp : data.totals.exp,
              totalPerc : data.percetage
          };
                    
        },
        
        
        testing : function(){
            console.log(data);
        }
    }
    
    
})();




//UI CONTROLLER 

var UIController = (function(){//////////////////////////////////////////////////////////////
    //IIFE

    
    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',  
        expenseContainer :'.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel :'.budget__expenses--value',
        percentLabel: '.budget__expenses--percentage',
        container:'.container'
   };
    return {
        getInput:function(){
            return {
             type : document.querySelector(DOMStrings.inputType).value,    // type is either exp or inc
             description : document.querySelector(DOMStrings.inputDescription).value,
             value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
        
            };
        },
        
        
        addListItem :function(obj,type){
            
            var html , newHtml , element;
            
            
            //Create Html string with Place holder Text
            
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
                
            }else if(type === 'exp'){
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            }
                        

            //Replace Place holder text with some actual data
            newHtml= html.replace('%id%' , obj.id);
            newHtml = newHtml.replace('%description%' , obj.description);
            newHtml = newHtml.replace('%value%' , obj.value);
                
            //Insert the HTML into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
        },
        
        
        
        deleteListItem : function(selectorID){
            var el =document.getElementById(selectorID); 
            
            el.parentNode.removeChild(el);
            
        },
        
        clearFields:function(){
          
            var fields , fieldsArr;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' +DOMStrings.inputValue); // it returns a list. into var.
            fieldsArr = Array.prototype.slice.call(fields); // passing list into array method to convert it into array
            
            fieldsArr.forEach(function(current , index , array){ //callback function which will than apply on each arry element. 
            
                current.value = "";
                 
                
            }); 
            fieldsArr[0].focus();
        },
        
        
        displayBudget : function(obj){
            
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
            
            
            if(obj.totalPerc > 0 ){
                document.querySelector(DOMStrings.percentLabel).textContent = obj.totalPerc + '%';
                
                
            }else{
                document.querySelector(DOMStrings.percentLabel).textContent = '---';
                
            }
            
            
        },
        
        
        getDomStrings : function(){
        return DOMStrings;
      }    
        
  }; 
        
})();



//GLOBAL APP CONTROLLER.
var controller = (function(budgetCtrl , UICtrl){///////////////////////////////////////////////
    //IIFE
    
    var setupEventListeners = function(){
    DOM = UICtrl.getDomStrings();    
    
        
        
    document.querySelector(DOM.inputBtn).addEventListener('click',cntrlAddItem);    
    document.addEventListener('keypress',function(event){
       if(event.keyCode === 13 || event.which === 13){
           cntrlAddItem();
       }
        
            });
    document.querySelector(DOM.container).addEventListener('click' ,cntrlDeleteItem);    
    };

    
    var updatePercentage = function (){
        
        //1 . calculate percentage 
        
        
        
        //2 . Read percentages from budget controller. 
        
        
        
        //3 . update UI with new Budget
        
    }
    
    
    
    var updateBudget = function(){///////////////////////////////////////////////////
      
        //1. calculate the budget
        
        budgetCtrl.calculateBudget();
        
        //2. Return  the budget. 
        
        var budget = budgetCtrl.getBudget();
        
        
        //3. Display the budget on the UI.
        
        UICtrl.displayBudget(budget);
        
    };
    
    
    
    var cntrlAddItem = function(){/////////////////////////////////////////////////
        //TO DO LIST
        var input , newItem ;
        
        //1.get filed input data
        input = UICtrl.getInput();
        
        if(input.description !== ""  && !isNaN(input.value) && input.value > 0){
            
        //2.add the item to budget controller
        
        newItem =  budgetCtrl.addItem(input.type , input.description ,input.value);
        
        //3.add the new item to UI.
        UICtrl.addListItem(newItem , input.type);
        
        //4 . clear fields
        UICtrl.clearFields();
        
        // 5.Calculate and update budget .
        updateBudget();    
        // 6.Calculate and update percentages
        updatePercentage();
            
        }
        
         
    }
    
    var cntrlDeleteItem = function(event){/////////////////////////////////////////////////
        var itemID ,type , id , splidID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
         if(itemID){
             
             splitID = itemID.split('-');
             
             type = splitID[0];
             id = parseInt(splitID[1]);
             
             //1 delete item from data structure
             
             budgetCtrl.deleteItem(type , id); 
             
             //2 delete item from the UI 
             UICtrl.deleteListItem(itemID);
             
             //3 update and show the new budget
             updateBudget();
             
             //4.Calculate and update percentages
             updatePercentage();
             
             
         }
    
    
    
    
    
    
    
    
    }
    return {
        init : function(){
        console.log('applicatoin has started');
         
        UICtrl.displayBudget({
            budget : 0,
            totalExp : 0,
            totalInc : 0,
            totalPerc:-1
            
        });
        setupEventListeners();
        }
    };
    
    
    
    
    
})(budgetController , UIController);


controller.init(); 