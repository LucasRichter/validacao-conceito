import React, { useState, useEffect, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, filter, debounceTime, switchMap } from 'rxjs/operators';

function SearchInput({
  debounce = 300,
  loading = false,
  onChange,
  ...props
}) {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    if (subject === null) {
      const sub = new BehaviorSubject('');
      setSubject(sub);
    } else {
      subject.pipe(
        map(s => s.trim()),
        distinctUntilChanged(),
        filter(s => s.length >= 2),
        debounceTime(debounce),
        switchMap(onChange),
      ).subscribe(s => s);

      return () => {
        subject.unsubscribe();
      }
    }
  }, [subject, debounce, onChange]);

  const handleChange = useCallback(
    (e) => {
      if (subject) {
        return subject.next(e.target.value);
      }
    },
    [subject],
  )

  return (
    <div className="input-group mb-3 mt-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Search icons"
        aria-describedby="basic-addon2"
        onChange={handleChange}
        {...props}
      />
      <div className="input-group-append">
        { loading ?
          <span className="input-group-text" id="basic-addon2">Loading...</span> :
          <span className="input-group-text" id="basic-addon2">Ready</span>
        }
      </div>
    </div>
  );
}

export default SearchInput;