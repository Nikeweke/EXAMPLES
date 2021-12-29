## Template

#### Use component self-closing tag if there is no slots

###### Bad:
```html
  <Component></Component>
```
###### Good:
```html
  <Component />
```
<br><br>


#### If there is more than 2 props split them in multiple lines and follow [props order](https://vuejs.org/v2/style-guide/#Element-attribute-order-recommended)

###### Bad:
```html
  <Component @click="handleClick" :type="foo" :theme="bar" v-else @change="handleChange" :active="false" />
```
```html
  <Component @click="handleClick"
             :type="foo"
             :theme="bar"
             v-else
             @change="handleChange"
             :active="false"></Component>
```
###### Good:
```html
  <Component
    v-else
    :active="false"
    :type="foo"
    :theme="bar"
    @change="handleChange"
    @click="handleClick"
  />
```
<br><br>


#### Use double quotes in `template` and single in `script`

###### Bad:
```html
  <Component type='foo' class="bar" />
```
###### Good:
```html
  <Component
    type="foo"
    class="bar"
  />
```
<br><br>


#### Use computed property instead of conditions

###### Bad:
```html
  <Component v-if="accessToken && user.data" />
```
###### Good:
```html
  <Component v-if="isLogedIn" />

  // ...
  isLogedIn () {
    return this.accessToken && this.user.data
  }
```
<br><br>


#### Always use `key` with `v-for`

###### Bad:
```html
  <Component v-for="item in items" />
```
###### Good:
```html
  <Component
    v-for="(item, i) in items"
    :key="`item-${i}`"
  />
```
<br><br>


#### Passing slots

###### Bad:
```html
  <Component
    @click="handleClick"
    :active="false"
    :type="foo">Submit</Component>
```
```html
  <Component
    @click="handleClick"
    :active="false"
    :type="foo"
  >Submit</Component>
```
###### Good:
```html
  <Component
    :active="false"
    :type="foo"
    @click="handleClick"
  >
    Submit
  </Component>
```
<br><br>


#### Using the “Mustache” syntax

###### Bad:
```html
  <div>{{text}}</div>
```
###### Good:
```html
  <div>{{ text }}</div>
```
<br><br>


#### Split a lot of markup with comments

###### Bad:
```html
<div v-if="isRegular" class="related-session-inner_regular">
  <h4 class="related-session-inner__header">
    {{ time }}
  </h4>
  <p class="related-session-inner__body" v-html="shortDescriptionCuted"></p>
  <div
    class="related-session__translation-icon"
    v-html="translationIcon"
    v-if="sessionData.metadata.translator"
  ></div>
</div>
<div v-if="isFeatured" class="related-session-inner_featured">
  <div class="related-session-inner_featured-content">
    <h4 class="related-session-inner__header">
      {{ time }}
    </h4>
    <p class="related-session-inner__body">
      {{ title }}
    </p>
  </div>
  <div
    class="related-session-inner_featured-logo"
    :style="logoStyles"
  >
  </div>
</div>
```

###### Good:
```html
<!-- REGULAR ITEM -->
<div v-if="isRegular" class="related-session-inner_regular">
  <h4 class="related-session-inner__header">
    {{ time }}
  </h4>
  <p class="related-session-inner__body" v-html="shortDescriptionCuted"></p>
  <div
    class="related-session__translation-icon"
    v-html="translationIcon"
    v-if="sessionData.metadata.translator"
  ></div>
</div>
<!-- REGULAR ITEM -->

<!-- FEATURED ITEM -->
<div v-if="isFeatured" class="related-session-inner_featured">
  <div class="related-session-inner_featured-content">
    <h4 class="related-session-inner__header">
      {{ time }}
    </h4>
    <p class="related-session-inner__body">
      {{ title }}
    </p>
  </div>
  <div
    class="related-session-inner_featured-logo"
    :style="logoStyles"
  >
  </div>
</div>
<!-- FEATURED ITEM -->
```
<br><br>
