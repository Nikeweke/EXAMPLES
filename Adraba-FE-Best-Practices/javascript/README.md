# JS

#### Avoid "Can not read prop of undefined". Use [ramda pathOr method](http://ramdajs.com/docs/#pathOr) or atleast do check

###### Bad:
```javascript
object.nested.prop
```
###### Good:
```javascript
pathOr('', ['nested', 'prop'], object)
```
```javascript
if (object && object.nested) {
  object.nested.prop
}
```
<br><br>


#### Do NOT mutate. Use [ramda clone](http://ramdajs.com/docs/#clone) or ES6 destructure

###### Bad:
```javascript
1. Object copy
obj1 = obj2

2. Array copy
arr1 = arr1

3. Add item
arr.push()

4. Remove item
arr.splice(2, 1)
```
###### Good:
```javascript
1. Object copy
obj1 = clone(obj2)
obj1 = { ...obj2 }

2. Array copy
arr1 = [...arr2]

3. Add item
arr = [...arr, newItem]

4. Remove item
arr = arr.filter((item, i) => i !== indexToDelete)
```
<br><br>


#### Use ternary operator

###### Bad:
```javascript
if (condition) {
  return a
} else {
  return b
}
```
###### Good:
```javascript
return condition
  ? a
  : b
```
<br><br>


#### Skip brackets in arrow functions if it is possible

###### Bad:
```javascript
const arrowFunc = (prop) => {
  return prop + 1
}
```
###### Good:
```javascript
const arrowFunc = prop => prop + 1
```
<br><br>
