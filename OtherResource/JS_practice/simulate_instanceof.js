//simulating instanceof
Function.prototype.hasInstanceBe = function(obj) {
        var protoConstrPointed = this.prototype;
        var protoInstPointed = Object.getPrototypeOf(obj);
        while (protoInstPointed !== null) {
            if (protoInstPointed === protoConstrPointed) {
                return true;
            }
            protoInstPointed = Object.getPrototypeOf(protoInstPointed);
        }
        return false;
    }
    //test code
function GrandpaType() {}

function FatherType() {}
FatherType.prototype = new GrandpaType();
FatherType.prototype.constructor = FatherType;

function SonType() {}
SonType.prototype = new FatherType();
SonType.prototype.constructor = SonType;

var colors = new SonType();

GrandpaType.hasInstanceBe(colors); //true
FatherType.hasInstanceBe(colors); //true
SonType.hasInstanceBe(colors); //true
