# TutorJS
##### A simple and extensible jQuery walkthrough & tutorial library

#


###### Why?
Ever wanted to create a tutorial for your new spunky application? Me too. I couldn't find any out there that suited my needs, so I made one.

Usage
---------------

**1. Include**

    <script src="./tutor.js"/>

**2. Create a Tutor**

    var tutorial = new Tutor;




A preorder traversal visits the nodes in the tree in a top-down fashion: first
the root node is visited, then all of its child nodes are recursively visited.
`_.walk.postorder` does the opposite, calling the visitor function for a node
only after visiting all of its child nodes.

Collection Functions
--------------------

The \_.walk module provides versions of most of the
[Underscore collection functions](http://underscorejs.org/#collections), with
some small differences that make them better suited for operating on trees.
-----------

A _parse tree_ is tree that represents the syntactic structure of a formal
language. For example, the arithmetic expression `1 + (4 + 2) * 7` might have
