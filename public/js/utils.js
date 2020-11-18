const letterFilter = (frag, array) => array.filter((word) => word[frag.length - 1].toLowerCase().trim() === frag[frag.length - 1].toLowerCase().trim());
