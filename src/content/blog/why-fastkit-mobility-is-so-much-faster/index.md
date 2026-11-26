---
title: "Why fastkit-mobility is so much faster than scikit-mobility?"
description: "What makes the traditional mobility analysis libraries so slow, and what makes fastkit-mobility so fast."
date: 2026-11-26
---

<style>
article :not(pre) > code::before, article :not(pre) > code::after { content: none; }
.viz { margin: 1.6rem 0; font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.3; }
.viz figcaption { margin-top: .5rem; font-size: .75rem; color: var(--mut); text-align: center; }
.viz .flow, .viz .chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.viz .step, .viz .chip { flex: 1 1 7rem; text-align: center; border-radius: 8px; padding: .55rem .4rem; background: var(--code); }
.viz .step { border: 2px solid #006a85; }
.viz .chip { border-top: 5px solid #006a85; }
.viz .chip.bad { border-top-color: #d7261e; }
.viz .step b { display: block; font-size: .85rem; color: var(--link); }
.viz .chip b { display: block; font-size: 1.35rem; color: var(--fg); }
.viz span { font-size: .72rem; }
.viz .cells { display: flex; gap: 3px; margin: .3rem 0; align-items: stretch; }
.viz .cells .lbl { flex: 0 0 5.6rem; font-size: .72rem; font-weight: 700; text-align: right; padding-right: .4rem; align-self: center; }
.viz .cells span { flex: 0 1 3.3rem; min-width: 0; text-align: center; padding: .45rem 0; border: 1.5px solid #222; border-radius: 5px; color: #111; font-size: .68rem; }
.viz .cells .u0 { background: #a5d8ff; } .viz .cells .u1 { background: #ffd8a8; } .viz .cells .u2 { background: #b2f2bb; }
.viz .cells span.none { flex: 0 1 12rem; border-style: dashed; border-color: var(--mut); color: var(--fg); }
.viz .cells .lbl + span.u2:last-child { flex: 0 1 13.4rem; }
.viz .bar { display: flex; min-height: 4rem; border-radius: 8px; overflow: hidden; color: #fff; font-size: .7rem; text-align: center; }
.viz .bar div { display: flex; flex-direction: column; justify-content: center; padding: .2rem; }
.viz .bar .s1 { width: 15%; background: #8250df; } .viz .bar .s2 { width: 26%; background: #bf3989; }
.viz .bar .s3 { width: 48%; background: #d7261e; } .viz .bar .s4 { width: 11%; background: #6e7781; }
.viz table { width: 100%; border-collapse: collapse; font-size: .78rem; }
.viz th, .viz td { text-align: left; padding: .4rem .5rem; border-bottom: 1px solid var(--rule); }
.viz thead th { border-bottom: 2px solid #006a85; }
@media (max-width: 520px) {
  .viz .cells { gap: 1px; }
  .viz .cells .lbl { flex-basis: 3.4rem; font-size: .6rem; padding-right: .2rem; }
  .viz .cells span { font-size: .52rem; letter-spacing: -.03em; border-width: 1px; }
}
</style>

Mobility analysis informs governments and business in the decisions they take. Take for example, seminal studies like [Wesolowski et al. 2012](https://doi.org/10.1126/science.1223467) (*Science*) and [Chang et al. 2021](https://doi.org/10.1038/s41586-020-2923-3) (*Nature*), where the computed mobility methods helped the government of Kenya make informed decisions about how to better control malaria, and informed the United States in how to organize the re-opening of stores during the COVID-19 outbreak. This means that understanding how people move through cities is essential.

As people move through cities in similar ways, the methods used to study mobility share some patterns. For example, a decision maker may be interested in how much time people spend commuting, how far are their trips, how many trips and how many locations they visit on a single day. These questions and many others are a very common part of analyzing mobility. Besides that, the data doesn't come cleanly. Most times, the GPS records need to be organized in stay locations and trips, and the bizarre points need to be removed. This kind of data pre-processing is special to mobility data analysis and also very common. As these operations are pretty common, developers started packaging them on ready-to-use libraries. One of the main ones is scikit-mobility.

Scikit-mobility appeared around 2019, led by Luca Pappalardo, Filippo Simini, Gianni Barlacchi, Roberto Pellungrini. It implemented several common mobility metrics,  such as jump lengths, radius of gyration. It also implemented data cleaning methods, like noise detection and stop detection. Finally, it provided data structures to better organize your analysis and also cared about privacy, synthetic data generation and easy plotting functions. This incredible library is one of the most famous mobility libraries, with more than 800 stars, 260 citations and the reference in terms of human mobility analysis.

<figure class="viz not-prose">
<div class="chips"><div class="chip "><b>2019</b><span>first appeared</span></div><div class="chip "><b>800+</b><span>GitHub stars</span></div><div class="chip "><b>260</b><span>citations</span></div></div>
</figure>


Unfortunately, if you try running this library in 2026, you're going to face some problems. First, after installing the library, the first thing you're going to notice is that it doesn't runs anymore. Looking to the error message:

```python
ImportError: cannot import name 'cascaded_union' from 'shapely.ops' (.venv/lib/python3.10/site-packages/shapely/ops.py)
```

The library pins, with their `pyproject.toml`, geopandas to ">=0.10.2,<0.11", which accepts any Shapely version ">= 1.6". Shapely, on 2025, updated to the 2.1 version, and replaced the name of the `cascaded_union` function to `unary_union`, which is directly imported in the scikit-mobility library. In this way, the import error don't allow you to use the library if you use recent tools. If you work around this problem, downgrading the shapely version, installing a older python version and its stack, or working with a scikit-mobility fork, you can then work with the library. Then, you're going to meet one problem that plagues most of the open-source mobility libraries available: Speed.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>pyproject.toml</b><span>geopandas &gt;=0.10.2,&lt;0.11</span></div><div class="step"><b>geopandas</b><span>Shapely &gt;=1.6</span></div><div class="step"><b>Shapely 2.1</b><span>no cascaded_union</span></div><div class="step"><b>ImportError</b><span>direct import</span></div></div>
</figure>


It is not like these libraries are slow, they are very *very* slow... But this is not something that is easy to *notice*. Ok... How can something be slow, but hard to detect? Well, for non-experienced folks, if your well established mobility library takes some minutes to compute the radius of gyration, you just assume that this is the *normal* time it takes to compute the radius of gyration. Even, if you're more experienced, you know that Python is not very fast, and probably is accustomed with more time-expensive workflows. So again, unless you're obsessed with performance, just like I've become, you just assume that things are normal. 

But, in the end of 2025, when I started a internship as a undergrad from Brazil at the TRiBE team in INRIA, under the supervision of Aline Carneiro Viana, I also accepted that waiting some time for the radius of gyration was something *normal*. I've even written my own numpy-based faster version, so that the waiting time was *normal*. I did not worry about that for some weeks, but my research focus was urban simulations, and as I had more and more simulations results and more and more metrics to compute and compare between simulations and real mobility traces, I noticed that things are taking a lot of time. And this bothered me a lot. But during my internship I was still working and developing the methodology of the work that I presented at Sigspatial 2026, so I did not have the time to investigate this further. After coming back to Brazil in the end of march of 2026, everyone was talking about how claude code was a game-changing tool, so I decided to try it out. To deal with my frustration, I've asked it to re-write some of the common functions from scikit-mobility using Rust. This idea came after seeing projects like Polars, which implements Pandas-like functionality in Rust, with a python interface and is several times faster. In the end, claude had produced a 5-10x faster version by using Rust.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>Late 2025</b><span>internship at TRiBE, INRIA</span></div><div class="step"><b>Simulations</b><span>more metrics, more waiting</span></div><div class="step"><b>March 2026</b><span>back in Brazil, Claude Code</span></div><div class="step"><b>Rust</b><span>5-10x faster</span></div></div>
</figure>


I really loved how cool and easy was this process, and then, on the weekends, started adding more functionality from scikit-mobility to what would eventually become fastkit-mobility. But these functionalities are still on the range of 5-10x times faster. But, making things faster was so thrilling and exciting, and I decided to discover if things could be even faster. Then, on the following months, I spends many hours adding prints to understand how much time each line of code took, using different profilers to understand memory usage and why some simple lines seemed to suck a lot of the runtime. In the end, I had developed Fastkit-mobility which implements the functionality of 10+ mobility libraries while being hundreds (or even thousands) of times faster then them.

In this blog post, I'm gonna describe exactly what makes the traditional mobility analysis libraries so slow, and the current shape of what makes fastkit-mobility so fast.

For that, I'm going to use a simple example that is going to illustrate what makes the architecture of scikit-mobility (and other similar libraries) and fastkit-mobility so different, which allows fastkit to be faster.

The example is the jump lengths function, which computes, for each user the distance between each point in their trajectory. To simplify this example, I'm going to use the Brightkite dataset, which provides \~4M check-in information from 51K users of a location-based social media platform. With this dataset, we can just compute the geographic distance between the chronological check-in locations of the users, without worrying about dealing with raw GPS datasets, which would require some preprocessing and more careful consideration.

With this setup, we can start loading the brightkite dataset. For reference, this blog post is accompanied by a Github repository (TO BE ADDED) where everything can be reproduced, but all the relevant code snippets are going to appear on the post so you can follow along:

```python
import pandas as pd

df = pd.read_csv("loc-brightkite_totalCheckins.txt.gz", sep="\t", header=None, names=["uid", "datetime", "lat", "lng", "location_id"])
df["datetime"] = pd.to_datetime(df["datetime"], errors="coerce")
```

As you can notice, we are using Pandas, which is a DataFrame library. Scikit-Mobility is tied to this library and this is going to have consequences soon.

Ok. Now for scikit-mobility, we can compute the jump lengths in the following way, according to the documentation:

```python
from skmob.measures.individual import jump_lengths

>>> jl_df = jump_lengths(tdf.sort_values(by='datetime'))
>>> print(jl_df.head())
```

This way of calling the function has several performance, problems, so I'm going to use the following call, which is the most performative inside of scikit-mobility library:

```python
from skmob.measures.individual import jump_lengths

>>> jl_df = jump_lengths(df)
>>> print(jl_df.head())
```

That is, no sorting before-hand and no TrajDataFrame.

Now, if you take a look at the [implementation](https://github.com/scikit-mobility/scikit-mobility/blob/master/skmob/measures/individual.py#L465) of this function, it works like this:

```python
def jump_lengths(traj, show_progress=True, merge=False):
    if constants.UID not in traj.columns:
        return pd.DataFrame(pd.Series([_jump_lengths_individual(traj)]), columns=[sys._getframe().f_code.co_name])
    
    if show_progress:
        df = traj.groupby(constants.UID).progress_apply(lambda x: _jump_lengths_individual(x))
    else:
        df = traj.groupby(constants.UID).apply(lambda x: _jump_lengths_individual(x))
    
    df = pd.DataFrame(df).reset_index().rename(columns={0: sys._getframe().f_code.co_name})
    
    if merge:
        # merge all lists 
        jl_list =[]
        for x in df.jump_lengths:
            jl_list.extend(x)
        return jl_list
    return df
    
    
def _jump_lengths_individual(traj):
	if len(traj) == 1:  # if there is just one point, no distance can be computed
	        return []
	    lats_lngs = traj.sort_values(by=constants.DATETIME)[[constants.LATITUDE, constants.LONGITUDE]].values
	    lengths = np.array([getDistanceByHaversine(lats_lngs[i], lats_lngs[i - 1]) for i in range(1, len(lats_lngs))])
	    return lengths
```

Which for simplicity, I'm going to represent as:

```python
def jump_lengths(traj):
    df = traj.groupby(constants.UID).apply(lambda x: _jump_lengths_individual(x))
    
    return df
    
def _jump_lengths_individual(traj):
	lats_lngs = traj.sort_values(by=constants.DATETIME)[[constants.LATITUDE, constants.LONGITUDE]].values
	lengths = np.array([getDistanceByHaversine(lats_lngs[i], lats_lngs[i - 1]) for i in range(1, len(lats_lngs))])
	return lengths
```

And for a quick reference, the haversine function used by scikit-mobility:

```python
def getDistanceByHaversine(loc1, loc2):
    lat1, lon1 = loc1
    lat2, lon2 = loc2
    
    # convert to radians
    lon1 = lon1 * pi / 180.0
    lon2 = lon2 * pi / 180.0
    lat1 = lat1 * pi / 180.0
    lat2 = lat2 * pi / 180.0

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = (sin(dlat/2))**2 + cos(lat1) * cos(lat2) * (sin(dlon/2.0))**2
    c = 2.0 * atan2(sqrt(a), sqrt(1.0-a))
    km = earthradius * c
    return km
```

Going back to the simplified jump lengths:

```python
df = traj.groupby(constants.UID).apply(lambda x: _jump_lengths_individual(x))
```

First, we have the groupby and apply functions, that on Pandas 1.x worked more or less like this: (Simplified by claude code sonnet 5.5)

```python
# 1) factorize the uid column (grouper.py: Grouping._codes_and_uniques)
codes, uniques = algorithms.factorize(uid_values, sort=True)   # sort=True is the groupby default
#    inside factorize: hash-based factorize_array(...) gives first-appearance codes,
#    then  uniques, codes = safe_sort(uniques, codes, ...)    # sort the uniques, remap the codes

# 2) group_info (ops.py:945): for one key it is just (codes, arange(ngroups), ngroups)

# 3) the splitter (ops.py:1296, class DataSplitter)
sort_idx = get_group_index_sorter(codes, ngroups)      # counting sort, or mergesort argsort
sorted_data = data.take(sort_idx)                      # copies every column in group order
slabels = codes.take(sort_idx)
starts, ends = lib.generate_slices(slabels, ngroups)   # Cython, boundaries of each group
for start, end in zip(starts, ends):
    mgr = sorted_data._mgr.get_slice(slice(start, end), axis=1)   # a view, no data copy
    yield sorted_data._constructor(mgr).__finalize__(sorted_data, method="groupby")

# 4) the apply loop (ops.py:823)
for key, group in zip(group_keys, splitter):
    object.__setattr__(group, "name", key)
    res = f(group)                                     # skmob's _jump_lengths_individual
    result_values.append(res)

# 5) wrap (generic.py, _wrap_applied_output)
if isinstance(first_not_none, (np.ndarray, Index)):
    return self.obj._constructor_sliced(values, index=self.grouper.result_index, name=...)
    # a Series of arrays with object dtype, indexed by the sorted uid keys
```

Because pandas wants to group the unique values, it is going to first factorize (using a hash table) the values, and map each row (codes) with a integer index to the uniques array. For example:

uniques: (29994, 33867, 53047) and remaps the codes to (0,2,2,1,2,1,1,0,0)

<figure class="viz not-prose">
<div class="cells"><div class="lbl">uid column</div><span class="u0">29994</span><span class="u2">53047</span><span class="u2">53047</span><span class="u1">33867</span><span class="u2">53047</span><span class="u1">33867</span><span class="u1">33867</span><span class="u0">29994</span><span class="u0">29994</span></div>
<div class="cells"><div class="lbl">codes</div><span class="u0">0</span><span class="u2">2</span><span class="u2">2</span><span class="u1">1</span><span class="u2">2</span><span class="u1">1</span><span class="u1">1</span><span class="u0">0</span><span class="u0">0</span></div>
<div class="cells"><div class="lbl">uniques</div><span class="u0">29994</span><span class="u1">33867</span><span class="u2">53047</span></div>
<figcaption>Factorize: each row gets the index of its user in the sorted uniques.</figcaption>
</figure>


Interestingly, this part is implemented in Cython and is kind of fast, but single-threaded. Unfortunately, pandas after getting the position of each user in the dataframe, is going to do a full copy of the dataframe, even for columns that are not used, with the data ordered user-by-user, and give you this new dataframe to use. Despite allowing the flexibility of pandas, this is very expensive. On my benchmarks, takes around 100ms (full fastmob's jump lenghts takes 77ms), if the data is already sorted, and 253ms for shuffled data (already slower than fastkit-mobility indexed mode). Then, to make matters worse, it is going to construct a new dataframe for each user, so it can use .apply, which is going to take around 600ms if you use pandas dataframes, and 3.7s if you use TrajDataFrames because it is going to construct this special object for each data. The cost here is not copying the internal data in memory, but creating these data structures in memory. 

<figure class="viz not-prose">
<div class="chips"><div class="chip "><b>~100ms</b><span>copy, sorted data</span></div><div class="chip bad"><b>253ms</b><span>copy, shuffled data</span></div><div class="chip bad"><b>600ms</b><span>one DataFrame per user</span></div><div class="chip bad"><b>3.7s</b><span>one TrajDataFrame per user</span></div></div>
</figure>


Now, for the internal cost inside of individual jump lengths function, which happens inside of .apply which is just a plain single-threaded python loop, we have this:

```python
def _jump_lengths_individual(traj):
	lats_lngs = traj.sort_values(by=constants.DATETIME)[[constants.LATITUDE, constants.LONGITUDE]].values
	lengths = np.array([getDistanceByHaversine(lats_lngs[i], lats_lngs[i - 1]) for i in range(1, len(lats_lngs))])
	return lengths

``` 

Because Pandas sorts the user dataframes by order of arrival, now they need to be sorted by the datetime, which over the 4M rows, is going to consume about 4.21s, with most of this time on the creation of the pandas data structure, with a copy, to hold the sorted data. Then, it is going to take about 7.36s for building the column selection of each user dataframe, because it is a copy. All of these internal creation of pandas objects on memory, is responsible for around 41% of the the time of scikit-mobility computation.

Finally, we have the actual jump lengths computation, which is going to take about \~47.9% of the computation time (\~13s). Remember it:

```python
from math import sin,cos,atan,acos,asin,atan2,sqrt,pi, modf

# Relevant snippet 
lengths = np.array([getDistanceByHaversine(lats_lngs[i], lats_lngs[i - 1]) for i in range(1, len(lats_lngs))])

def getDistanceByHaversine(loc1, loc2):
    lat1, lon1 = loc1
    lat2, lon2 = loc2
    
    # convert to radians
    lon1 = lon1 * pi / 180.0
    lon2 = lon2 * pi / 180.0
    lat1 = lat1 * pi / 180.0
    lat2 = lat2 * pi / 180.0

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = (sin(dlat/2))**2 + cos(lat1) * cos(lat2) * (sin(dlon/2.0))**2
    c = 2.0 * atan2(sqrt(a), sqrt(1.0-a))
    km = earthradius * c
    return km
```


First, it unpacks the np.float64 tuples into local variables, which require copying, accounting for about 21.5% (6s) of the whole runtime.

Then, the rest of the function is also going to be very slow, which is why the haversine is responsible for \~47.9% of the runtime. It is slow because the latitude and longitude are np.float64 objects while the pi constant and the numerical functions are from python standard library, which reads the numpy values and allocates a new python float object (overhead) and then computes it slower. This function could be a lot faster with vectorized numpy, but shows the problem of these hidden costs of abstractions.

<figure class="viz not-prose">
<div class="bar"><div class="s1"><b>sort</b>4.21s</div><div class="s2"><b>column selection</b>7.36s</div><div class="s3"><b>haversine</b>~13s</div><div class="s4">rest</div></div>
<figcaption>Where scikit-mobility spends its time: ~41% creating pandas objects, ~47.9% in the haversine.</figcaption>
</figure>


Now for a comparison, I'm going to show how fastkit-mobility handles the jump lengths computation, and why it can take less than 100ms:

```python
def jump_lengths(
	traj: Any,
	merge: bool = False,
	*,
	datetime_col: str | None = None,
	lat_col: str | None = None,
	lng_col: str | None = None,
	uid_col: str | None = None,
):
	df = nw.from_native(unwrap_native(traj))
    if isinstance(df, nw.LazyFrame):
        df = df.collect()

    df, datetime_col, lat_col, lng_col, uid_col = _detect_trajectory_columns(
        df,
        datetime_col=datetime_col,
        lat_col=lat_col,
        lng_col=lng_col,
        uid_col=uid_col,
        cast_float_coordinates=True,
    )
    df = _with_datetime_column(df, datetime_col)
    lats_data = df.get_column(lat_col).to_arrow()
    lngs_data = df.get_column(lng_col).to_arrow()

    timestamps = df.get_column(datetime_col).to_arrow()
    uid_values, indices, ends = _build_user_ranges_auto(
        df,
        uid_col,
        timestamps,
        coordinates=(lats_data, lngs_data),
    )
    if indices is None:
        v_starts, v_ends, flat_values = jump_lengths_presorted(lats_data, lngs_data, ends)
    else:
        v_starts, v_ends, flat_values = jump_lengths_indexed(lats_data, lngs_data, indices, ends)

    flat_values = _as_arrow(flat_values)

    if merge:
        if _DISPATCHER.get_backend_key(df) == "numpy":
            return flat_values.to_numpy(zero_copy_only=False)
        return flat_values

    jump_values = _grouped_arrow_values(v_starts, v_ends, flat_values, value_offsets=True)
    if uid_col is None:
        return _to_native({"jump_lengths": jump_values}, df)
    return _to_native({uid_col: uid_values, "jump_lengths": jump_values}, df)

```

Which I'm going to break down into several parts, to explain how it works.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>1</b><span>any DataFrame</span></div><div class="step"><b>2</b><span>columns as Arrow</span></div><div class="step"><b>3</b><span>user ranges</span></div><div class="step"><b>4</b><span>parallel Rust</span></div><div class="step"><b>5</b><span>your DataFrame back</span></div></div>
</figure>


```python
df = nw.from_native(unwrap_native(traj))
if isinstance(df, nw.LazyFrame):
	df = df.collect()
```

First, I use Narwhals, which is compatibility layer between data frame libraries, allowing fastkit-mobility to deal with libraries like pandas, polars, dask, modin, duckdb tables, etc... with the same code. Also, this code that shows that Fastkit-mobility currently only supports dataframes that fit in RAM memory. Some people in conferences requested that fastkit-mobility handled out-of-memory data, which is very hard, but I've found that it is possible and about 10x faster than using traditional tools like polars, pyspark and others, but this is something to be considered in the future.

This is piece of code has very low overhead, unless the data has to be materialized on memory. 

```python
df, datetime_col, lat_col, lng_col, uid_col = _detect_trajectory_columns(
	df,
	datetime_col=datetime_col,
	lat_col=lat_col,
	lng_col=lng_col,
	uid_col=uid_col,
	cast_float_coordinates=True,
)
df = _with_datetime_column(df, datetime_col)
lats_data = df.get_column(lat_col).to_arrow()
lngs_data = df.get_column(lng_col).to_arrow()

timestamps = df.get_column(datetime_col).to_arrow() 
```

This piece of code is just to make the function flexible with different column names and making sure that the data is on the right format. The first important concept here is the Arrow memory format. The language used by Fastkit-Mobility to make things hundreds of times faster is Rust, which is a strongly-typed compiled language. This means that we need to be very specific with the data types used on each function, which is different from Python which is a dynamically-typed language. Just for a bit of history and context, I initially developed the Rust kernel of the library with a Arrow and also a Numpy port, which are the two mainstream memory format in the dataframes, but most migrated to Arrow recently, and the overhead today, on the current Python versions, to converting between Numpy to Arrow is moderate, but only about 40ms on the Brightkite dataset if you are using pandas, but this for the codebase maintainability this is a small cost, because if the dataframe library is already Arrow-backed the cost would be zero. Because our example is using pandas, this to_arrow() conversion takes around \~20-40ms.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>Python</b><span>dynamically typed</span></div><div class="step"><b>Arrow</b><span>typed, contiguous columns</span></div><div class="step"><b>Rust</b><span>compiled, strongly typed</span></div></div>
</figure>


```python
uid_values, indices, ends = _build_user_ranges_auto(
	df,
	uid_col,
	timestamps,
	coordinates=(lats_data, lngs_data),
)
``` 

This next piece of code show one of the most important features of fastkit-mobility in terms of making things faster. First, it is important to note, that all the data, from the user ids, to the timestamps and the coordinates are stored in the Arrow memory format, which means that, for simplicity, they are stored contiguously in memory in a single block. And I'm calling a function that is going to provide me 3 very important arrays for parallelizing operations in fastkit-mobility. But to explain it, I'm going to get a random sample of 3 users from the brightkite dataset to show how things work:

```python

rng = np.random.default_rng(7)
users = rng.choice(df["uid"].unique(), size=3, replace=False)

sample = (
    df[df["uid"].isin(users)]
    .sort_values(["uid", "datetime"])
    .groupby("uid")
    .head(5)                      # first 5 check-ins per user
    .reset_index(drop=True)
)
sample.head()

     uid                  datetime        lat         lng
0  29994 2009-01-04 08:44:14+00:00  29.998354  -97.871532
1  29994 2009-01-04 08:47:09+00:00  29.999821  -97.842736
2  29994 2009-06-19 18:30:56+00:00  30.245598  -97.779808

3  33867 2009-02-27 22:02:51+00:00  39.099727  -94.578567
4  33867 2009-03-01 03:55:36+00:00  39.091372  -94.562698
5  33867 2009-03-02 05:18:27+00:00  39.049652  -94.599570

6  53047 2009-03-26 00:57:23+00:00 -37.783333  144.983333
7  53047 2009-03-29 07:02:45+00:00 -37.750000  145.116667
8  53047 2009-04-03 00:13:38+00:00 -37.816667  145.166667


```

In this case the data is already sorted, so the 3 values for the parallelization are going to be.

The uid_values: These represent the user ids values on which block of the following arrays.

The indices: Only necessary if the data is not already sorted. I'm going to show soon.

And the ends: Where the data from each user ends.


<figure class="viz not-prose">
<div class="cells"><div class="lbl">uid column</div><span class="u0">29994</span><span class="u0">29994</span><span class="u0">29994</span><span class="u1">33867</span><span class="u1">33867</span><span class="u1">33867</span><span class="u2">53047</span><span class="u2">53047</span><span class="u2">53047</span></div>
<div class="cells"><div class="lbl">uid_values</div><span class="u0">29994</span><span class="u1">33867</span><span class="u2">53047</span></div>
<div class="cells"><div class="lbl">indices</div><span class="none">None (already sorted)</span></div>
<div class="cells"><div class="lbl">ends</div><span class="u0">3</span><span class="u1">6</span><span class="u2">9</span></div>
<figcaption>Rows grouped by user and sorted by time. ends is the exclusive end of each user's block.</figcaption>
</figure>


The algorithm could work with a simple linear scan, checking for where the uid_values differ in consecutive positions and if they are time-ordered, but fastkit-mobility uses a fancy parallel check for this, that follows the same idea. On the runtime for the jump lenghts, it takes only 8.8% on the sorted case (6.3ms from 76ms). The actual fancy scan takes about 1ms, the rest is null checking and other things.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>Runs of uid</b><span>parallel scan, ~1ms</span></div><div class="step"><b>Each user once?</b><span>grouped</span></div><div class="step"><b>Time ordered?</b><span>within each user</span></div><div class="step"><b>Nulls?</b><span>coordinates ok</span></div></div>
<figcaption>The whole check: 6.3ms of 76ms. If it fails, the indexed path is used.</figcaption>
</figure>



Now, the case that the is shuffled. Notice that the timestamps are also shuffled, which should be considered because we want the chronological check-ins distance, for example:

```python
     uid                  datetime        lat         lng
0  29994 2009-06-19 18:30:56+00:00  30.245598  -97.779808
1  53047 2009-03-29 07:02:45+00:00 -37.750000  145.116667
2  53047 2009-03-26 00:57:23+00:00 -37.783333  144.983333
3  33867 2009-03-02 05:18:27+00:00  39.049652  -94.599570
4  53047 2009-04-03 00:13:38+00:00 -37.816667  145.166667
5  33867 2009-02-27 22:02:51+00:00  39.099727  -94.578567
6  33867 2009-03-01 03:55:36+00:00  39.091372  -94.562698
7  29994 2009-01-04 08:44:14+00:00  29.998354  -97.871532
8  29994 2009-01-04 08:47:09+00:00  29.999821  -97.842736
```

In this case, the value returned for each of the arrays is:


<figure class="viz not-prose">
<div class="cells"><div class="lbl">uid column</div><span class="u0">29994</span><span class="u2">53047</span><span class="u2">53047</span><span class="u1">33867</span><span class="u2">53047</span><span class="u1">33867</span><span class="u1">33867</span><span class="u0">29994</span><span class="u0">29994</span></div>
<div class="cells"><div class="lbl">uid_values</div><span class="u0">29994</span><span class="u2">53047</span><span class="u1">33867</span></div>
<div class="cells"><div class="lbl">indices</div><span class="u0">7</span><span class="u0">8</span><span class="u0">0</span><span class="u2">2</span><span class="u2">1</span><span class="u2">4</span><span class="u1">5</span><span class="u1">6</span><span class="u1">3</span></div>
<div class="cells"><div class="lbl">ends</div><span class="u0">3</span><span class="u2">6</span><span class="u1">9</span></div>
<figcaption>Shuffled rows. indices holds row numbers, user by user, oldest first.</figcaption>
</figure>



In this case, the indices array is filled and it stores the ordered indices of each user, while the ends array says where the indices of each user ends. This guarantees that we can parallelize the operation and access the data in the right order. As you saw earlier, it is a single function call, so if the linear scan gives something strange, it exits and go to the indexed algorithm.

This algorithm is a little bit more complicated. Because the user data is scattered on memory, what we are going to is dense factorize the user ids, based on the order of appearance. This means that the first user id value is going to receive the value of 0, the second the value 1, etc... Now, you might ask why this is important, as we have not used it on the sorted path. Well, on the sorted path we are doing comparisons between consecutive ids on the memory, but now we need to identify which row belong to which user and which order, requiring more comparisons. If you're using strings for the user ids, for example, these comparisons are very expensive, because strings are usually pointers to a place in memory with the characters, which you have to compare one by one with another string. So, by using integer, the comparison is a lot simpler. Also, by using dense integers we can more easily use them to index arrays in the code. Finally, we factorize to 32-bit integers, lowering the memory usage and speeding things computations on downstream tasks, but limiting to a maximum of 4 Billion distinct users, which is reasonable.

<figure class="viz not-prose">
<div class="cells"><div class="lbl">uid column</div><span class="u0">29994</span><span class="u2">53047</span><span class="u2">53047</span><span class="u1">33867</span><span class="u2">53047</span><span class="u1">33867</span><span class="u1">33867</span><span class="u0">29994</span><span class="u0">29994</span></div>
<div class="cells"><div class="lbl">dense u32</div><span class="u0">0</span><span class="u2">1</span><span class="u2">1</span><span class="u1">2</span><span class="u2">1</span><span class="u1">2</span><span class="u1">2</span><span class="u0">0</span><span class="u0">0</span></div>
<figcaption>Dense factorization: numbered by order of first appearance.</figcaption>
</figure>


With this data, the algorithm is going to, through a fancy parallel Rust computation, do the following: Fill the ends array using the number of rows each user has, and fill the indices array with the order of appearance of each user, then it is going sort (by timestamp) the indices subsection of each user in parallel. This works well for each thread, because they don't touch the section of each other. After other small fancy things, it is going to return the 3 arrays we are going to need to execute the operation in a fast way, with the user_ids back to the original form, so the user receives familiar ids in the result.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>Count</b><span>rows per user: ends</span></div><div class="step"><b>Fill</b><span>row numbers per user</span></div><div class="step"><b>Sort</b><span>each block by time, in parallel</span></div><div class="step"><b>Return</b><span>original user ids</span></div></div>
</figure>


Now, this user ranges building operation can be applied to any metric or function that works with individual users and going to allows us to parallelize things very easily on Rust, which I'm going to show soon. While it would be faster to do a specialized function for each metric, this makes creating new metrics that are fast a lot more easily.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>User ranges</b><span>uid_values, indices, ends</span></div><div class="step"><b>Any per-user metric</b><span>jump lengths, radius of gyration</span></div><div class="step"><b>Parallel Rust</b><span>users are independent</span></div></div>
</figure>


Now, for the jump lengths actual computation:

```python
if indices is None:
	v_starts, v_ends, flat_values = jump_lengths_presorted(lats_data, lngs_data, ends)

else:
	v_starts, v_ends, flat_values = jump_lengths_indexed(lats_data, lngs_data, indices, ends)
```

Now, I'm going to show how the Rust bridging works, starting with the presorted path:

```rust
#[pyfunction]
pub fn jump_lengths_presorted<'py>(
	py: Python<'py>,
	latitudes: ArrowPyArray,
	longitudes: ArrowPyArray,
	ends: pyo3_arrow::PyArray,
	) -> PyResult<PyJumpLengths<'py>> {
	
	let (starts, ends, values) = run_presorted_coordinate_arrow(py, latitudes, longitudes, ends, |coords, ends| {
		jump_lengths_presorted_impl(coords.latitudes, coords.longitudes, ends)
	})?.map_err(PyValueError::new_err)?;
	
	Ok((u64_indices(starts).into_pyarray(py),
		u64_indices(ends).into_pyarray(py),
		arrow_f64_output(py, values)?,
	))

}

```

This code snippet shows the very important bridge between Python and Rust. There are several ways to build this bridge between languages, but several of them if not using the right types, in this case the Arrow memory format, is going to hide a huge data conversion cost between languages, which is only going to appear with dedicated profiling tools like samply. Here, the data crosses the languages without copying, so we can take advantage of Rust capabiltities fully. It is going to make sure the data is ok, release the python's Global Interpreter Lock (GIL), allowing other parallel work by python because Rust is not going to access any python object during its execution, and give the latitudes and longitudes to the actual jump lengths computation, which can be used by other languages in the future, and then make sure the results are given back to python without copies.

<figure class="viz not-prose">
<div class="flow"><div class="step"><b>Arrow in</b><span>no copy</span></div><div class="step"><b>Validate</b><span>the inputs</span></div><div class="step"><b>Release GIL</b><span>no Python objects</span></div><div class="step"><b>Rust kernel</b><span>pure Rust</span></div><div class="step"><b>Back to Python</b><span>no copy</span></div></div>
</figure>


Now, to the actual computation:

```rust
pub fn jump_lengths_presorted_impl(
	latitudes: &[f64],
	longitudes: &[f64],
	ends: &[usize],
) -> JumpLengthsPresortedResult {

	let ranges = ranges_from_ends(ends)?;
	validate_coord_ranges(latitudes, longitudes, &ranges)?;
	let (value_starts, value_ends) = jump_offsets_for_ranges(&ranges);
	let mut values = vec![0.0; value_ends.last().copied().unwrap_or(0)];
	let mut rest = values.as_mut_slice();
	let mut chunks = Vec::with_capacity(ranges.len());
	
	for (&start, &end) in value_starts.iter().zip(&value_ends) {
		let len = end - start;
		let (chunk, next) = rest.split_at_mut(len);
		chunks.push(chunk);
		rest = next;
	}
	
	chunks.into_par_iter().zip(ranges.par_iter()).for_each(|(chunk, &(start, end))| {
		write_jump_lengths_presorted_range(latitudes, longitudes, start, end, chunk);
	});
	
	Ok((value_starts, value_ends, values))

}
```

It basically prepares the buffer result for the jump lengths, then parellizes the computation for each user. 

<figure class="viz not-prose">
<div class="cells"><div class="lbl">coordinates</div><span class="u0">p0</span><span class="u0">p1</span><span class="u0">p2</span><span class="u1">p3</span><span class="u1">p4</span><span class="u1">p5</span><span class="u2">p6</span><span class="u2">p7</span><span class="u2">p8</span></div>
<div class="cells"><div class="lbl">jump lengths</div><span class="u0">d01</span><span class="u0">d12</span><span class="u1">d34</span><span class="u1">d45</span><span class="u2">d67</span><span class="u2">d78</span></div>
<figcaption>One output buffer, split into a separate slice for each user, so threads never write to the same place.</figcaption>
</figure>


```rust
pub fn adjacent_haversine_distances_into_km(
	latitudes: &[f64],
	longitudes: &[f64],
	start: usize,
	end: usize,
	distances: &mut [f64],
) {
	if end - start < 2 {
		return;
	}
	
	#[cfg(feature = "numkong")]
	{
	
		let latitudes_rad: Vec<f64> = latitudes[start..end]
		.iter().map(|lat| lat.to_radians()).collect();
		
		let longitudes_rad: Vec<f64> = longitudes[start..end]
		.iter().map(|lon| lon.to_radians()).collect();
		
		f64::haversine(
			&latitudes_rad[..latitudes_rad.len() - 1],
			&longitudes_rad[..longitudes_rad.len() - 1],
			&latitudes_rad[1..],
			&longitudes_rad[1..],
			distances,
		)
		.expect("adjacent coordinate slices have matching lengths");
		
		distances.iter_mut().for_each(|distance| *distance *= NUMKONG_TO_GEO_KM);
	
	}


	#[cfg(not(feature = "numkong"))]
	for (idx, distance) in distances.iter_mut().enumerate() {
		*distance = haversine_km(
		latitudes[start + idx],
		longitudes[start + idx],
		latitudes[start + idx + 1],
		longitudes[start + idx + 1],
	);

	}

}

```

Because the data is contiguous in memory, I can use Single-Instruction-Multiple-Data (SIMD) operations, which computes the haversine for several numbers at the same clock, using special registors and arithmetic units from modern CPUs, using the optimized Numkong library. Otherwise, it fallback to a more normal thing. SIMD requires contiguous memory, which can theoratically speeds things up to 8x times but in this case is only about 2x. In this way, this rust kernel computes the full jump lengths in the sorted path in 15ms, about 21% of the runtime.

<figure class="viz not-prose">
<div class="cells"><div class="lbl">scalar</div><span class="u0">d01</span><span class="u0">d12</span><span class="u0">d23</span><span class="u0">d34</span></div>
<div class="cells"><div class="lbl">SIMD</div><span class="u2">d01 · d12 · d23 · d34</span></div>
<figcaption>Scalar code computes one distance at a time; SIMD computes several in the same instructions.</figcaption>
</figure>


The indexed path is very similar, but with special but simple adjustments to make it work with user data that is not contiguous, taking about 46.3ms, about 20.7% of the runtime.

Going back to the python, this result is then assembled back in the dataframe library of choice of the user:

```python
if indices is None:
	v_starts, v_ends, flat_values = jump_lengths_presorted(lats_data, lngs_data, ends)
	
else:
	v_starts, v_ends, flat_values = jump_lengths_indexed(lats_data, lngs_data, indices, ends)

flat_values = _as_arrow(flat_values)

if merge:
	if _DISPATCHER.get_backend_key(df) == "numpy":
		return flat_values.to_numpy(zero_copy_only=False)
	
	return flat_values

jump_values = _grouped_arrow_values(v_starts, v_ends, flat_values, value_offsets=True)

if uid_col is None:
	return _to_native({"jump_lengths": jump_values}, df)

return _to_native({uid_col: uid_values, "jump_lengths": jump_values}, df)
```

Overall, there are several things that make fastkit-mobility faster, and is hard to separate things in a clear way, but the main takeaways is:
- Take control of the memory usage. Writing/Reading to memory is very expensive, and taking the control to avoid unnecessary and hidden memory costs makes a huge difference.
- Compiled languages are a lot better for this kind computation, but notice that the actual computation takes 1/5 of the total time.
- Parallelization helps, but python libraries usually copy the data between threads and processes because accessing the same memory blocks at the same time can cause problems if not taken care of.

<figure class="viz not-prose">
<table><thead><tr><th></th><th>scikit-mobility</th><th>Fastkit-Mobility</th></tr></thead><tbody><tr><th>Group by user</th><td>copies all columns</td><td>ranges / indices</td></tr><tr><th>Per user</th><td>new DataFrame</td><td>slice of a buffer</td></tr><tr><th>Sort by time</th><td>new sorted object</td><td>sort integers</td></tr><tr><th>Output</th><td>one array per user</td><td>one flat buffer</td></tr></tbody></table>
<figcaption>Memory, side by side.</figcaption>
</figure>

To end this post, I would say that really understanding what you're building, investigating the hidden costs, and taking ownership of the full pipeline is the key to building better tools for the future.
