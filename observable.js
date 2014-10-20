if (typeof Def === 'undefined')
  Def = {};

/*
 *  This is a mix-in for objects/classes that want to provide hooks for
 *  custom events.  See Def.Autocompleter.Event for an example of the usage.
 *  The methods here are not meant to be called directly by code that wants
 *  to register a callback.  Instead, the class that extends this one can
 *  provide observe[Event Name] methods that call storeCallback.
 */
Def.Observable = {
  /**
   *  Storage of callback functions.  Null means there are no callbacks
   *  registered.
   */
  callbacks_: null,

  /**
   *  Runs the callbacks for the given event.  (This is meant for internal
   *  use by the autocompleter code; other code should not call it.)
   *  The callbacks are run in a timeout so that normal operation of the
   *  autocompleter can continue.
   * @param field the field on which the event occurred.  This
   *  can be null for certain types of events (for which storeCallback
   *  was called with null).
   * @param eventType the type of event (e.g. 'LIST_EXP' for list expansions)
   * @param data a hash containing an event-specific data structure.  See the
   *  relevant "observe..." method for the details of what callbacks can expect.
   */
  notifyObservers: function(field, eventType, data) {
console.log("%%% in notify Observers");
    if (this.callbacks_ !== null) {
console.log("%%% callbacks is not null");
      data['field_id'] = field ? field.id : null;
      setTimeout(function() {
        var eventCallbacks = this.callbacks_[eventType];
console.log("%%% eventType = "+eventType);
console.log("%%% eventCallbacks = " + eventCallbacks);
        if (eventCallbacks !== undefined) {
          if (field !== null) {
            var key = this.lookupKey(field);
            var fieldEventCallbacks = eventCallbacks[key];
          }
          // Also get the callbacks that apply to all fields
          var allFieldEventCallbacks = eventCallbacks[null];
          var allCallbacks = [fieldEventCallbacks, allFieldEventCallbacks];
console.log("%%% callback length is "+allCallbacks.length);
          for (var j=0, maxJ=allCallbacks.length; j<maxJ; ++j) {
            var callbackArray = allCallbacks[j];
console.log("%%% callbackArray = " +callbackArray);
            if (callbackArray !== undefined) {
console.log("%%% callbackArray.length = " +callbackArray.length);
              for (var i=0, c=callbackArray.length; i<c; ++i) {
console.log("%%% calling " + callbackArray[i]);
                callbackArray[i].call(this, data);
              }
            }
          }
        }
      }.bind(this),1);
    }
  },


  /**
   *  Returns a lookup key for finding callbacks for the given field.
   *  This is overridable.  By default it returns the field's name, but it
   *  could be something more general, e.g. a part of a field's ID that is shared
   *  by several fields so that an event observer can be easily registered on a
   *  set of similar fields.
   * @param field the field for which the lookup key is needed.
   */
  lookupKey: function(field) {
    return field.name;
  },


  /**
   *  Stores a callback function.  (This is meant for internal
   *  use by the classes that extend Observable; other code should not call it.)
   * @param baseFieldID the central part of the field ID with the prefix
   *  (ending with _) and the suffix (numbers like _1_2_1) removed.  If null
   *  is passed, the callback will be called anytime the event occurs on any
   *  field.
   * @param eventType The type of event for which the callback is to be called
   * @param callback the callback function
   */
  storeCallback: function(baseFieldID, eventType, callback) {
    if (this.callbacks_ === null)
      this.callbacks_ = {};
    var listExpCallbacks = this.callbacks_[eventType];
    if (listExpCallbacks === undefined) {
      listExpCallbacks = {};
      this.callbacks_[eventType] = listExpCallbacks;
    }
    var fieldListExpCallbacks = listExpCallbacks[baseFieldID];
    if (fieldListExpCallbacks === undefined) {
      fieldListExpCallbacks = [];
      listExpCallbacks[baseFieldID] = fieldListExpCallbacks;
    }
    fieldListExpCallbacks.push(callback);
  }

};
