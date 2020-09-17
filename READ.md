# Data-access-layer

Why are we using Promises here?
Promises are the ideal choice for handling asynchronous operations in the simplest manner.

What benefits are there for breaking out these functions into their own resource?
They are easy to manage when dealing with multiple asynchronous operations where callbacks can create callback hell leading to unmanageable code.

What other functionality could you foresee leveraging this separation of concerns technique with?
WHenever you want a result for, because promises always return something.
