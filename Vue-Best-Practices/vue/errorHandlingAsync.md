## Error handling of async actions. Some notes

1. *It's important to decide how you will handle errors in the very start of the development process!* Discuss it with designer and customer. You need to understand how will your components, which provide user with information about error, look like (modal windows, popups, error pages etc.).

2. It's important to understand, that even though we struggle to create a perfect product, 
there will always be a possibility to catch an error. When you write a request to the backend just ask yourself:
*'What will user see, if this request retutns an error? Will he understand what happened and what to do next after this?"*

3. Never write a request to BE without error catching and error handling. 

4. What is the best way to inform  user about an error in your programm? Well, there are many possible variants. Here is one of them:
	- first of all, show him a modal with brief and clear message of what happened.
  #### Bad practice: 
  "Something went wrong", "An error occured".


  #### Good practice: 
  "An error occured. Failed to load the list of requested videos."
  How do we do this?

```javascript
async fetchVideosList ({ commit }) {
  try {
    const { data } = await this.$axios.get(api.videos.getList())
    commit(SET_VIDEOS_LIST, data)
  } catch (err) {
    $bus.$emit('showErrorMessage', { 'message': 'Failed to load requested videos list', 'title': 'An error occured' })
    throw err
  }
}
```
This is our action, where we want to get the list of videos. So we make a request to BE and 'await' a Promise. 
If the Promise is rejected, the rejected value is thrown and we catch it in the 'Catch' block.   
Now we 'emit' the 'showErrorMessage' event. Our modal window component listens to it. When the modal hears it, it's shown with the message we pass.
The last thing we need is to throw the error to the higher leveled code. What do we need it for? The answer is provided below.
- The next step is to catch the error directly in the component, where we called our 'fetchVideosList'  action. 
  
```javascript
async requestData () {
  try {
    await this.fetchVideosList()
  } catch (err) {
    throw err
  }
}
```
What for? Let's imagine a situation: an error occured and our model with error message appeared. User read the message and closed the modal. What next? The script fell and user cannot see the full data on page. Depending on the severity of the error, we can handle it differently. We can redirect user to the error page or hide an empty section etc. (discuss  it with designer and customer).

---

#### Promise.all

Here is a little advise for last. 
If you have something like this...

```javascript
async requestData () {
  try {
    await this.fetchVideosList()
    await this.fetchVideosPageSettings()
    await this.fetchSelectedVideos()
    await this.fetchUserData()
  } catch (err) {
    throw err
  }
}
```
...and you need all Promises to be resolved before render and it's Ok not to do this in the exact sequence, better use ***Promise.all*** method.
The Promise.all method returns a single Promise that resolves when *all of the promises in the iterable argument have resolved* or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.
This wil look like this:

```javascript
async requestData () {
  try {
    await Promise.all([this.fetchVideosList(), this.fetchVideosPageSettings(), this.fetchSelectedVideos(), this.fetchUserData()])
  } catch (err) {
    throw err
  }
}
```
**Why is it better?** First of all, the code looks more clear. The other important thing - it takes less time to perform, as the functions *([this.fetchVideosList(), this.fetchVideosPageSettings(), this.fetchSelectedVideos(), this.fetchUserData()])* perform in parallel, not one by one.


